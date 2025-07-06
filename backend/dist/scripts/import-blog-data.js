"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogImporter = void 0;
const fs_1 = require("fs");
const xml2js_1 = require("xml2js");
const client_1 = require("@prisma/client");
const slugify_1 = require("slugify");
const prisma = new client_1.PrismaClient();
class BlogImporter {
    categories = new Map();
    tags = new Map();
    users = new Map();
    posts = new Map();
    async importFromAtom(filePath) {
        console.log('🚀 Starting blog import...');
        try {
            const xmlContent = (0, fs_1.readFileSync)(filePath, 'utf-8');
            console.log('📖 Reading ATOM file...');
            const parsed = await (0, xml2js_1.parseStringPromise)(xmlContent);
            const entries = parsed.feed.entry || [];
            console.log(`📝 Found ${entries.length} entries`);
            await this.createBasicEntities(entries);
            await this.createPosts(entries);
            await this.createComments(entries);
            console.log('✅ Import completed successfully!');
        }
        catch (error) {
            console.error('❌ Import failed:', error);
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    }
    async createBasicEntities(entries) {
        console.log('👥 Creating users, categories, and tags...');
        const authors = new Set();
        const categoryNames = new Set();
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
            if (entry.author?.[0]?.name?.[0]) {
                authors.add(entry.author[0].name[0]);
            }
            if (entry.category) {
                for (const cat of entry.category) {
                    try {
                        let categoryName = '';
                        if (cat.$ && cat.$.term) {
                            categoryName = cat.$.term;
                        }
                        else if (cat.term) {
                            categoryName = cat.term;
                        }
                        else if (typeof cat === 'string') {
                            categoryName = cat;
                        }
                        else if (cat._) {
                            categoryName = cat._;
                        }
                        if (categoryName && categoryName.trim()) {
                            categoryNames.add(categoryName.trim());
                        }
                    }
                    catch (error) {
                        console.warn(`⚠️  Skipping invalid category:`, cat);
                    }
                }
            }
        }
        for (const authorName of authors) {
            if (authorName && authorName.trim()) {
                const cleanName = authorName.trim();
                const baseEmail = `${this.createSlug(cleanName)}@imported.local`;
                try {
                    let user = await prisma.user.findUnique({
                        where: { email: baseEmail }
                    });
                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                email: baseEmail,
                                name: cleanName,
                            },
                        });
                        console.log(`👤 Created user: ${cleanName}`);
                    }
                    else {
                        console.log(`👤 Found existing user: ${cleanName}`);
                    }
                    this.users.set(authorName, user.id);
                }
                catch (error) {
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
                    }
                    catch (finalError) {
                        console.warn(`⚠️  Failed to create user: ${cleanName}`, finalError);
                    }
                }
            }
        }
        for (const catName of categoryNames) {
            if (catName && catName.trim()) {
                const cleanName = catName.trim();
                const baseSlug = this.createSlug(cleanName);
                try {
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
                }
                catch (error) {
                    console.warn(`⚠️  Failed to create category/tag: ${cleanName}`, error);
                }
            }
        }
    }
    async createPosts(entries) {
        console.log('📰 Creating posts...');
        const posts = entries.filter(entry => entry['blogger:type']?.[0] === 'POST' &&
            entry['blogger:status']?.[0] === 'LIVE');
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
                const createdAt = entry['blogger:created']?.[0] ? new Date(entry['blogger:created'][0]) : new Date();
                const publishedAt = entry.published?.[0] ? new Date(entry.published[0]) : createdAt;
                const updatedAt = entry.updated?.[0] ? new Date(entry.updated[0]) : createdAt;
                const slug = this.createUniqueSlug(title);
                const contentText = this.stripHtml(content);
                const excerpt = this.createExcerpt(contentText);
                const wordCount = contentText.split(/\s+/).length;
                const readingTime = Math.ceil(wordCount / 200);
                const images = this.extractImages(content);
                const featuredImage = images[0] || null;
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
                this.posts.set(entry.id[0], post.id);
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
                if (entry.category) {
                    for (const cat of entry.category) {
                        try {
                            let catName = '';
                            if (cat.$ && cat.$.term) {
                                catName = cat.$.term;
                            }
                            else if (cat.term) {
                                catName = cat.term;
                            }
                            else if (typeof cat === 'string') {
                                catName = cat;
                            }
                            else if (cat._) {
                                catName = cat._;
                            }
                            if (!catName || !catName.trim())
                                continue;
                            const categoryId = this.categories.get(catName);
                            if (categoryId) {
                                await prisma.postCategory.create({
                                    data: {
                                        post_id: post.id,
                                        category_id: categoryId,
                                    },
                                });
                            }
                            const tagId = this.tags.get(catName);
                            if (tagId) {
                                await prisma.postTag.create({
                                    data: {
                                        post_id: post.id,
                                        tag_id: tagId,
                                    },
                                });
                            }
                        }
                        catch (error) {
                            console.warn(`⚠️  Skipping invalid category for post:`, cat);
                        }
                    }
                }
                console.log(`📝 Created post: ${title}`);
            }
            catch (error) {
                console.error(`❌ Failed to create post: ${entry.title?.[0]}`, error);
            }
        }
    }
    async createComments(entries) {
        console.log('💬 Creating comments...');
        const comments = entries.filter(entry => entry['blogger:type']?.[0] === 'COMMENT' &&
            entry['blogger:status']?.[0] === 'LIVE');
        for (const entry of comments) {
            try {
                const content = entry.content?.[0]?._ || '';
                const authorName = entry.author?.[0]?.name?.[0] || 'Anonymous';
                const parentBloggerId = entry['blogger:parent']?.[0];
                if (!parentBloggerId)
                    continue;
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
            }
            catch (error) {
                console.error(`❌ Failed to create comment`, error);
            }
        }
    }
    createSlug(text) {
        return (0, slugify_1.default)(text, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g
        });
    }
    createUniqueSlug(title) {
        let baseSlug = this.createSlug(title);
        let slug = baseSlug;
        let counter = 1;
        slug = `${baseSlug}-${Date.now()}`;
        return slug;
    }
    stripHtml(html) {
        return html
            .replace(/<[^>]*>/g, ' ')
            .replace(/&[^;]+;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
    createExcerpt(text, maxLength = 160) {
        if (text.length <= maxLength)
            return text;
        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        return lastSpace > 0
            ? truncated.substring(0, lastSpace) + '...'
            : truncated + '...';
    }
    extractImages(content) {
        const images = [];
        const imgRegex = /<img[^>]+src="([^"]+)"/gi;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
            images.push(match[1]);
        }
        return images;
    }
}
exports.BlogImporter = BlogImporter;
async function main() {
    const importer = new BlogImporter();
    const atomFilePath = process.argv[2] || './feed.atom';
    console.log(`📂 Importing from: ${atomFilePath}`);
    await importer.importFromAtom(atomFilePath);
}
if (require.main === module) {
    main().catch(console.error);
}
//# sourceMappingURL=import-blog-data.js.map