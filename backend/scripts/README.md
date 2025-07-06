# Blog Import Script

This script imports blog data from Blogger's ATOM export file into your new Prisma database schema.

## Prerequisites

1. **Set up your database** - Make sure your PostgreSQL database exists and is accessible
2. **Configure DATABASE_URL** - Update your `.env` file with the correct database connection
3. **Generate Prisma client** - Run `npx prisma generate`
4. **Run migrations** - Run `npx prisma migrate dev` or `npx prisma db push`

## Usage

### 1. Place your ATOM file

Put your exported `feed.atom` file in the backend directory (or note its path).

### 2. Run the import

```bash
# If feed.atom is in the backend directory
npx ts-node scripts/import-blog-data.ts

# Or specify a custom path
npx ts-node scripts/import-blog-data.ts /path/to/your/feed.atom
```

### 3. What it imports

The script will:

✅ **Authors/Users** - Creates user accounts for all blog authors  
✅ **Categories** - Creates hierarchical categories from Blogger categories  
✅ **Tags** - Creates tags from Blogger categories (dual purpose)  
✅ **Posts** - Imports all published posts with:
- SEO-friendly slugs
- HTML content + plain text version
- Reading time estimation
- Featured images (first image from content)
- Meta descriptions (auto-generated excerpts)
- Original publish/update dates

✅ **Images** - Extracts and catalogs all images from posts  
✅ **Comments** - Imports all approved comments  

### 4. Progress tracking

The script provides detailed console output:

```
🚀 Starting blog import...
📖 Reading ATOM file...
📝 Found 1,247 entries
👥 Creating users, categories, and tags...
👤 Created user: Abdullah
🏷️  Created category/tag: Letters
🏷️  Created category/tag: Essays
📰 Creating posts...
📝 Created post: Condolence on death of mother...
📝 Created post: Female education...
💬 Creating comments...
💬 Created comment by Anonymous
✅ Import completed successfully!
```

## Features

### SEO Optimization
- **Slugs**: URL-friendly slugs for all posts and categories
- **Meta data**: Auto-generated meta titles and descriptions
- **Content**: Both HTML and plain text versions for search
- **Images**: Proper alt text and structured image data

### Data Integrity
- **Unique slugs**: Timestamp-based uniqueness to prevent conflicts
- **Author mapping**: Preserves original author information
- **Date preservation**: Maintains original creation and update dates
- **Error handling**: Continues processing even if individual items fail

### Content Processing
- **HTML stripping**: Creates clean text versions for search
- **Image extraction**: Finds and catalogs all images
- **Reading time**: Estimates based on word count
- **Excerpt generation**: Smart truncation for previews

## Troubleshooting

### Common Issues

**Database connection errors**
```bash
# Check your .env file
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

**Missing dependencies**
```bash
npm install xml2js slugify @types/xml2js
```

**Prisma client outdated**
```bash
npx prisma generate
```

**Large file processing**
For very large ATOM files (250k+ lines like yours), the script processes entries in batches and provides progress updates.

## Data Mapping

| Blogger Field | Our Schema Field |
|---------------|------------------|
| `title` | `post.title` |
| `content` | `post.content` & `post.content_text` |
| `published` | `post.published_at` |
| `category.term` | `category.name` & `tag.name` |
| `author.name` | `user.name` |
| Images in content | `post_image.url` |

## After Import

Once imported, you can:

1. **Review the data** in your database
2. **Set featured posts** by updating `post.featured = true`
3. **Organize categories** into hierarchies using `parent_id`
4. **Update SEO fields** like `meta_description` and `meta_keywords`
5. **Moderate comments** by setting `comment.approved = false` where needed

Your mother's blog content will be beautifully preserved and ready for the modern web! 🌟 