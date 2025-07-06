# Frontend API Integration Guide

## Overview
The frontend now integrates with the backend API to dynamically load categories in the navigation bar. This replaces the previous static categories with real-time data from the backend.

## What's Been Implemented

### 1. API Composables (`composables/useApi.ts`)
- `useApi()` - Base API utility for making HTTP requests
- `useCategories()` - Specific composable for categories API endpoints
- `usePosts()` - Composable for posts API endpoints

### 2. Dynamic Navigation (`layouts/default.vue`)
- Categories dropdown in the desktop navigation
- Mobile navigation with categories list
- Loading states and error handling
- Fallback to default categories if API fails

### 3. Updated Categories Page (`pages/categories/index.vue`)
- Fetches categories from API instead of using static data
- Loading and error states
- Fallback to default categories

### 4. Configuration (`nuxt.config.ts`)
- API proxy configuration for development
- Runtime configuration for API base URL

## How to Test

### 1. Start Both Servers
```bash
# Backend (from backend folder)
npm run dev

# Frontend (from frontend folder)
npm run dev
```

### 2. Test the Integration
1. Visit `http://localhost:3000`
2. Click on "Categories" in the navigation
3. Should see a dropdown with categories (loaded from API or fallback)
4. Check browser console for any error messages

### 3. Test Different Scenarios

#### With Backend Running
- Categories should load from `http://localhost:3001/api/categories`
- Dropdown should show real categories with post counts

#### Without Backend Running
- Frontend should gracefully fall back to default categories
- Error handling should work smoothly
- Navigation should still be functional

## API Endpoints Used

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `GET /api/categories/:slug/posts` - Get posts in category

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get post by slug
- `GET /api/posts/featured` - Get featured posts
- `GET /api/posts/recent` - Get recent posts

## Configuration

### Environment Variables
```env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
```

### Development Proxy
The development server automatically proxies `/api` requests to the backend at `http://localhost:3001/api`.

## Features

### Desktop Navigation
- Hover dropdown showing top 6 categories
- Clean, minimal design following Wired-style aesthetic
- Post counts for each category
- "All Categories" link at the top

### Mobile Navigation
- Categories section in mobile menu
- Top 4 categories shown
- "All Categories" link

### Error Handling
- Graceful fallback to default categories
- Loading states during API calls
- Error messages for debugging

### Performance
- Categories loaded once on app mount
- Cached in component state
- Minimal re-renders

## Customization

### Adding New API Endpoints
1. Add new functions to `composables/useApi.ts`
2. Use the `apiCall` helper function
3. Handle errors appropriately

### Modifying Categories Display
1. Update `layouts/default.vue` for navigation
2. Modify `pages/categories/index.vue` for the categories page
3. Customize `components/CategoryCard.vue` for individual category display

### Styling
- All styles follow the existing Wired-style design
- CSS classes are in `assets/css/main.css`
- Dropdown styles are integrated with the overall design system

## Troubleshooting

### Common Issues

1. **Categories not loading**
   - Check if backend is running on port 3001
   - Verify API endpoints are working
   - Check browser console for errors

2. **CORS issues**
   - Ensure backend has CORS configured
   - Check if proxy is working properly

3. **Styling issues**
   - Verify all CSS classes are defined
   - Check if custom CSS is loading

### Debug Mode
Check the browser console for detailed error messages and API call logs.

## Next Steps

1. **Backend Integration**: Ensure backend has the `/api/categories` endpoint implemented
2. **Database**: Categories should be stored in database with proper structure
3. **Content**: Add real category data to the backend
4. **SEO**: Add meta tags for category pages
5. **Search**: Implement search functionality for categories
6. **Caching**: Add caching for better performance

## File Structure
```
frontend/
├── assets/css/main.css              # Styles including dropdown
├── composables/useApi.ts            # API utilities
├── layouts/default.vue              # Main layout with navigation
├── pages/
│   └── categories/index.vue         # Categories page
├── nuxt.config.ts                  # Configuration
└── INTEGRATION_GUIDE.md            # This file
``` 