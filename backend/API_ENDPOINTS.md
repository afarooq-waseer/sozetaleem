# Blog CMS API Endpoints

## 📝 **Posts Endpoints**

### Public (Frontend)
```
GET    /api/posts                    # Get all published posts (paginated)
GET    /api/posts/:slug              # Get single post by slug
GET    /api/posts/featured           # Get featured posts
GET    /api/posts/recent             # Get recent posts
GET    /api/posts/popular            # Get popular posts (by view count)
GET    /api/posts/search?q=query     # Search posts
GET    /api/posts/category/:slug     # Get posts by category
GET    /api/posts/tag/:slug          # Get posts by tag
GET    /api/posts/author/:id         # Get posts by author
POST   /api/posts/:slug/view         # Increment view count
```

### Admin (CMS)
```
GET    /api/admin/posts              # Get all posts (including drafts)
POST   /api/admin/posts              # Create new post
PUT    /api/admin/posts/:id          # Update post
DELETE /api/admin/posts/:id          # Delete post
PATCH  /api/admin/posts/:id/publish  # Publish/unpublish post
PATCH  /api/admin/posts/:id/feature  # Feature/unfeature post
```

## 🏷️ **Categories Endpoints**

### Public
```
GET    /api/categories               # Get all categories (hierarchical)
GET    /api/categories/:slug         # Get category details
GET    /api/categories/:slug/posts   # Get posts in category
```

### Admin
```
GET    /api/admin/categories         # Get all categories with stats
POST   /api/admin/categories         # Create category
PUT    /api/admin/categories/:id     # Update category
DELETE /api/admin/categories/:id     # Delete category
```

## 🏷️ **Tags Endpoints**

### Public
```
GET    /api/tags                     # Get all tags
GET    /api/tags/:slug               # Get tag details
GET    /api/tags/:slug/posts         # Get posts with tag
GET    /api/tags/popular             # Get popular tags
```

### Admin
```
GET    /api/admin/tags               # Get all tags with stats
POST   /api/admin/tags               # Create tag
PUT    /api/admin/tags/:id           # Update tag
DELETE /api/admin/tags/:id           # Delete tag
```

## 💬 **Comments Endpoints**

### Public
```
GET    /api/posts/:slug/comments     # Get comments for post
POST   /api/posts/:slug/comments     # Submit new comment
POST   /api/comments/:id/reply       # Reply to comment
```

### Admin
```
GET    /api/admin/comments           # Get all comments
GET    /api/admin/comments/pending   # Get pending comments
PUT    /api/admin/comments/:id       # Update comment
DELETE /api/admin/comments/:id       # Delete comment
PATCH  /api/admin/comments/:id/approve # Approve comment
PATCH  /api/admin/comments/:id/reject  # Reject comment
```

## 👥 **Users Endpoints**

### Public
```
GET    /api/authors                  # Get all authors
GET    /api/authors/:id              # Get author profile
```

### Admin
```
GET    /api/admin/users              # Get all users
POST   /api/admin/users              # Create user
PUT    /api/admin/users/:id          # Update user
DELETE /api/admin/users/:id          # Delete user
```

## 🖼️ **Images Endpoints**

### Admin
```
GET    /api/admin/images             # Get all images
POST   /api/admin/images             # Upload image
DELETE /api/admin/images/:id         # Delete image
GET    /api/admin/posts/:id/images   # Get images for post
```

## 📊 **Analytics & Stats Endpoints**

### Admin
```
GET    /api/admin/stats/overview     # Dashboard stats
GET    /api/admin/stats/posts        # Post analytics
GET    /api/admin/stats/traffic      # Traffic analytics
GET    /api/admin/stats/popular      # Popular content
```

## 🔍 **Search Endpoints**

### Public
```
GET    /api/search?q=query           # Global search
GET    /api/search/suggestions?q=query # Search suggestions
```

---

## 📋 **Complete Endpoint List by HTTP Method**

### GET Endpoints (25)
```
/api/posts
/api/posts/:slug
/api/posts/featured
/api/posts/recent
/api/posts/popular
/api/posts/search
/api/posts/category/:slug
/api/posts/tag/:slug
/api/posts/author/:id
/api/posts/:slug/comments
/api/categories
/api/categories/:slug
/api/categories/:slug/posts
/api/tags
/api/tags/:slug
/api/tags/:slug/posts
/api/tags/popular
/api/authors
/api/authors/:id
/api/search
/api/search/suggestions
/api/admin/posts
/api/admin/categories
/api/admin/tags
/api/admin/comments
/api/admin/comments/pending
/api/admin/users
/api/admin/images
/api/admin/posts/:id/images
/api/admin/stats/overview
/api/admin/stats/posts
/api/admin/stats/traffic
/api/admin/stats/popular
```

### POST Endpoints (7)
```
/api/posts/:slug/view
/api/posts/:slug/comments
/api/comments/:id/reply
/api/admin/posts
/api/admin/categories
/api/admin/tags
/api/admin/users
/api/admin/images
```

### PUT Endpoints (4)
```
/api/admin/posts/:id
/api/admin/categories/:id
/api/admin/tags/:id
/api/admin/users/:id
/api/admin/comments/:id
```

### DELETE Endpoints (5)
```
/api/admin/posts/:id
/api/admin/categories/:id
/api/admin/tags/:id
/api/admin/users/:id
/api/admin/comments/:id
/api/admin/images/:id
```

### PATCH Endpoints (4)
```
/api/admin/posts/:id/publish
/api/admin/posts/:id/feature
/api/admin/comments/:id/approve
/api/admin/comments/:id/reject
```

---

## 🌟 **Frontend Integration Examples**

### Blog Homepage
```javascript
// Get featured posts
const featuredPosts = await fetch('/api/posts/featured').then(r => r.json());

// Get recent posts
const recentPosts = await fetch('/api/posts/recent').then(r => r.json());

// Get categories for navigation
const categories = await fetch('/api/categories').then(r => r.json());
```

### Post Detail Page
```javascript
// Get post content
const post = await fetch(`/api/posts/${slug}`).then(r => r.json());

// Get comments
const comments = await fetch(`/api/posts/${slug}/comments`).then(r => r.json());

// Increment view count
await fetch(`/api/posts/${slug}/view`, { method: 'POST' });
```

### Search Page
```javascript
// Search posts
const results = await fetch(`/api/search?q=${query}`).then(r => r.json());

// Get suggestions
const suggestions = await fetch(`/api/search/suggestions?q=${query}`).then(r => r.json());
```

### Admin Dashboard
```javascript
// Get dashboard stats
const stats = await fetch('/api/admin/stats/overview').then(r => r.json());

// Get pending comments
const pendingComments = await fetch('/api/admin/comments/pending').then(r => r.json());
```

---

## 🚀 **Implementation Priority**

### Phase 1 (Core Blog)
1. `GET /api/posts` - List posts
2. `GET /api/posts/:slug` - Single post
3. `GET /api/categories` - Categories
4. `GET /api/posts/category/:slug` - Posts by category

### Phase 2 (Enhanced Features)
1. `GET /api/posts/search` - Search
2. `GET /api/posts/:slug/comments` - Comments
3. `POST /api/posts/:slug/comments` - Submit comments
4. `GET /api/posts/featured` - Featured posts

### Phase 3 (Admin CMS)
1. All `/api/admin/*` endpoints
2. Authentication middleware
3. File upload handling
4. Comment moderation

This gives you a complete REST API specification for your blog CMS! 🎉
