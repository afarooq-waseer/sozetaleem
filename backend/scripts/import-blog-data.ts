import { readFileSync } from 'fs';
import { parseStringPromise } from 'xml2js';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

interface BloggerEntry {
  id: string[];
  'blogger:type': string[];
  'blogger:status': string[];
  title?: string[];
  content?: Array<{ _: string; $: { type: string } }>;
  'blogger:created': string[];
  published: string[];
  updated: string[];
  category?: Array<any>; // More flexible to handle different structures
  'blogger:filename'?: string[];
  author?: Array<{ name: string[] }>;
  'blogger:parent'?: string[];
  'blogger:metaDescription'?: string[];
}

interface BloggerFeed {
  feed: {
    entry: BloggerEntry[];
  };
}

class BlogImporter {
  private categories = new Map<string, string>(); // name -> id
  private tags = new Map<string, string>(); // name -> id
  private users = new Map<string, string>(); // name -> id
  private posts = new Map<string, string>(); // blogger-id -> our-id

  async importFromAtom(filePath: string) {
    console.log('🚀 Starting blog import...');
    
    try {
      // Read and parse the ATOM file
      const xmlContent = readFileSync(filePath, 'utf-8');
      console.log('📖 Reading ATOM file...');
      
      const parsed: BloggerFeed = await parseStringPromise(xmlContent);
      const entries = parsed.feed.entry || [];
      
      console.log(`📝 Found ${entries.length} entries`);

      // First pass: Create users, categories, and tags
      await this.createBasicEntities(entries);
      
      // Second pass: Create posts
      await this.createPosts(entries);
      
      // Third pass: Create comments
      await this.createComments(entries);
      
      console.log('✅ Import completed successfully!');
      
    } catch (error) {
      console.error('❌ Import failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  private async createBasicEntities(entries: BloggerEntry[]) {
    console.log('👥 Creating users, categories, and tags...');

    // Extract unique authors
    const authors = new Set<string>();
    const categoryNames = new Set<string>();

    // Debug: Log first few entries to understand structure
    console.log('🔍 Analyzing first few entries for structure...');
    for (let i = 0; i < Math.min(3, entries.length); i++) {
      const entry = entries[i];
      console.log(`Entry ${i + 1}:`, {
        type: entry['blogger:type']?.[0],
        status: entry['blogger:status']?.[0],
        hasTitle: !!entry.title,
        hasCategory: !!entry.category,
        categoryCount: entry.category?.length || 0,
        categoryStructure: entry.category?.[0] || 'none'
      });
    }

    for (const entry of entries) {
      // Extract authors
      if (entry.author?.[0]?.name?.[0]) {
        authors.add(entry.author[0].name[0]);
      }

      // Extract categories/tags
      if (entry.category) {
        for (const cat of entry.category) {
          try {
            // Handle different category structures
            let categoryName = '';
            
            if (cat.$ && cat.$.term) {
              // Structure: { $: { term: "category" } }
              categoryName = cat.$.term;
            } else if (cat.term) {
              // Structure: { term: "category" }
              categoryName = cat.term;
            } else if (typeof cat === 'string') {
              // Structure: "category"
              categoryName = cat;
            } else if (cat._) {
              // Structure: { _: "category" }
              categoryName = cat._;
            }
            
            if (categoryName && categoryName.trim()) {
              categoryNames.add(categoryName.trim());
            }
          } catch (error) {
            console.warn(`⚠️  Skipping invalid category:`, cat);
          }
        }
      }
    }

    // Create users
    for (const authorName of authors) {
      if (authorName && authorName.trim()) {
        const cleanName = authorName.trim();
        const baseEmail = `${this.createSlug(cleanName)}@imported.local`;
        
        try {
          // Try to find existing user first
          let user = await prisma.user.findUnique({
            where: { email: baseEmail }
          });
          
          if (!user) {
            // Create new user if not found
            user = await prisma.user.create({
              data: {
                email: baseEmail,
                name: cleanName,
              },
            });
            console.log(`👤 Created user: ${cleanName}`);
          } else {
            console.log(`👤 Found existing user: ${cleanName}`);
          }
          
          this.users.set(authorName, user.id);
          
        } catch (error) {
          // If still fails, create with unique timestamp
          const uniqueEmail = `${this.createSlug(cleanName)}-${Date.now()}@imported.local`;
          
          try {
            const user = await prisma.user.create({
              data: {
                email: uniqueEmail,
                name: cleanName,
              },
            });
            this.users.set(authorName, user.id);
            console.log(`👤 Created user with unique email: ${cleanName}`);
          } catch (finalError) {
            console.warn(`⚠️  Failed to create user: ${cleanName}`, finalError);
          }
        }
      }
    }

    // Create categories and tags
    for (const catName of categoryNames) {
      if (catName && catName.trim()) {
        const cleanName = catName.trim();
        const baseSlug = this.createSlug(cleanName);
        
        try {
          // Create category with upsert
          const category = await prisma.category.upsert({
            where: { slug: baseSlug },
            update: {},
            create: {
              name: cleanName,
              slug: baseSlug,
              description: `Imported category: ${cleanName}`,
              level: 0,
              path: baseSlug,
            },
          });
          this.categories.set(catName, category.id);

          // Create tag with upsert
          const tag = await prisma.tag.upsert({
            where: { slug: baseSlug },
            update: {},
            create: {
              name: cleanName,
              slug: baseSlug,
              description: `Imported tag: ${cleanName}`,
            },
          });
          this.tags.set(catName, tag.id);
          
          console.log(`🏷️  Created/found category/tag: ${cleanName}`);
          
        } catch (error) {
          console.warn(`⚠️  Failed to create category/tag: ${cleanName}`, error);
        }
      }
    }
  }

  private async createPosts(entries: BloggerEntry[]) {
    console.log('📰 Creating posts...');

    const posts = entries.filter(entry => 
      entry['blogger:type']?.[0] === 'POST' && 
      entry['blogger:status']?.[0] === 'LIVE'
    );

    for (const entry of posts) {
      try {
        const title = entry.title?.[0] || 'Untitled Post';
        const content = entry.content?.[0]?._ || '';
        const authorName = entry.author?.[0]?.name?.[0] || 'Unknown';
        const authorId = this.users.get(authorName);

        if (!authorId) {
          console.warn(`⚠️  Skipping post "${title}" - author not found: ${authorName}`);
          continue;
        }

        // Extract dates
        const createdAt = entry['blogger:created']?.[0] ? new Date(entry['blogger:created'][0]) : new Date();
        const publishedAt = entry.published?.[0] ? new Date(entry.published[0]) : createdAt;
        const updatedAt = entry.updated?.[0] ? new Date(entry.updated[0]) : createdAt;

        // Create slug from title
        const slug = this.createUniqueSlug(title);

        // Extract text content for search
        const contentText = this.stripHtml(content);
        const excerpt = this.createExcerpt(contentText);

        // Estimate reading time (average 200 words per minute)
        const wordCount = contentText.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        // Extract images from content
        const images = this.extractImages(content);
        const featuredImage = images[0] || null;

        // Create post
        const post = await prisma.post.create({
          data: {
            title: title.trim(),
            slug,
            excerpt,
            content,
            content_text: contentText,
            published: true,
            featured: false,
            allow_comments: true,
            view_count: 0,
            reading_time: readingTime,
            meta_title: title.trim(),
            meta_description: excerpt,
            published_at: publishedAt,
            author_id: authorId,
            featured_image: featuredImage,
            created_at: createdAt,
            updated_at: updatedAt,
          },
        });

        // Store mapping for comments
        this.posts.set(entry.id[0], post.id);

        // Create post images
        for (let i = 0; i < images.length; i++) {
          await prisma.postImage.create({
            data: {
              post_id: post.id,
              url: images[i],
              alt: `Image ${i + 1}`,
              order: i,
            },
          });
        }

        // Create post categories and tags
        if (entry.category) {
          for (const cat of entry.category) {
            try {
              // Handle different category structures
              let catName = '';
              
              if (cat.$ && cat.$.term) {
                catName = cat.$.term;
              } else if (cat.term) {
                catName = cat.term;
              } else if (typeof cat === 'string') {
                catName = cat;
              } else if (cat._) {
                catName = cat._;
              }
              
              if (!catName || !catName.trim()) continue;
              
              // Add to categories
              const categoryId = this.categories.get(catName);
              if (categoryId) {
                await prisma.postCategory.create({
                  data: {
                    post_id: post.id,
                    category_id: categoryId,
                  },
                });
              }

              // Add to tags
              const tagId = this.tags.get(catName);
              if (tagId) {
                await prisma.postTag.create({
                  data: {
                    post_id: post.id,
                    tag_id: tagId,
                  },
                });
              }
            } catch (error) {
              console.warn(`⚠️  Skipping invalid category for post:`, cat);
            }
          }
        }

        console.log(`📝 Created post: ${title}`);

      } catch (error) {
        console.error(`❌ Failed to create post: ${entry.title?.[0]}`, error);
      }
    }
  }

  private async createComments(entries: BloggerEntry[]) {
    console.log('💬 Creating comments...');

    const comments = entries.filter(entry => 
      entry['blogger:type']?.[0] === 'COMMENT' && 
      entry['blogger:status']?.[0] === 'LIVE'
    );

    for (const entry of comments) {
      try {
        const content = entry.content?.[0]?._ || '';
        const authorName = entry.author?.[0]?.name?.[0] || 'Anonymous';
        const parentBloggerId = entry['blogger:parent']?.[0];
        
        if (!parentBloggerId) continue;

        const postId = this.posts.get(parentBloggerId);
        if (!postId) {
          console.warn(`⚠️  Skipping comment - parent post not found`);
          continue;
        }

        const createdAt = entry['blogger:created']?.[0] ? new Date(entry['blogger:created'][0]) : new Date();

        await prisma.comment.create({
          data: {
            post_id: postId,
            author_name: authorName,
            content: content.trim(),
            approved: true,
            created_at: createdAt,
            updated_at: createdAt,
          },
        });

        console.log(`💬 Created comment by ${authorName}`);

      } catch (error) {
        console.error(`❌ Failed to create comment`, error);
      }
    }
  }

  private createSlug(text: string): string {
    return slugify(text, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }

  private createUniqueSlug(title: string): string {
    let baseSlug = this.createSlug(title);
    let slug = baseSlug;
    let counter = 1;

    // In a real implementation, you'd check the database for uniqueness
    // For now, we'll add a timestamp to ensure uniqueness
    slug = `${baseSlug}-${Date.now()}`;
    
    return slug;
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private createExcerpt(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;
    
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';
  }

  private extractImages(content: string): string[] {
    const images: string[] = [];
    const imgRegex = /<img[^>]+src="([^"]+)"/gi;
    let match;

    while ((match = imgRegex.exec(content)) !== null) {
      images.push(match[1]);
    }

    return images;
  }
}

// Usage
async function main() {
  const importer = new BlogImporter();
  
  // Update this path to your ATOM file
  const atomFilePath = process.argv[2] || './feed.atom';
  
  console.log(`📂 Importing from: ${atomFilePath}`);
  
  await importer.importFromAtom(atomFilePath);
}

if (require.main === module) {
  main().catch(console.error);
}

export { BlogImporter }; 