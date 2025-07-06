// API utility for making requests to the backend
const config = useRuntimeConfig();

const API_BASE = config.public.apiBase || '/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  async post<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  async put<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  async delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },
};

// Specific API functions for your blog
export const blogApi = {
  // Posts
  getPosts: (page = 1, limit = 10) => 
    api.get(`/posts?page=${page}&limit=${limit}`),
  
  getPost: (slug: string) => 
    api.get(`/posts/${slug}`),
  
  getFeaturedPosts: (limit = 5) => 
    api.get(`/posts/featured?limit=${limit}`),
  
  getRecentPosts: (limit = 10) => 
    api.get(`/posts/recent?limit=${limit}`),
  
  getPopularPosts: (limit = 10) => 
    api.get(`/posts/popular?limit=${limit}`),
  
  searchPosts: (query: string, page = 1, limit = 10) => 
    api.get(`/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`),
  
  getPostsByCategory: (slug: string, page = 1, limit = 10) => 
    api.get(`/posts/category/${slug}?page=${page}&limit=${limit}`),
  
  getPostsByTag: (slug: string, page = 1, limit = 10) => 
    api.get(`/posts/tag/${slug}?page=${page}&limit=${limit}`),
  
  getPostsByAuthor: (id: string, page = 1, limit = 10) => 
    api.get(`/posts/author/${id}?page=${page}&limit=${limit}`),
  
  incrementViewCount: (slug: string) => 
    api.post(`/posts/${slug}/view`),

  // Categories
  getCategories: () => 
    api.get('/categories'),
  
  getCategoryTree: () => 
    api.get('/categories/tree'),
  
  getCategory: (slug: string) => 
    api.get(`/categories/${slug}`),
  
  getCategoryPosts: (slug: string, page = 1, limit = 10) => 
    api.get(`/categories/${slug}/posts?page=${page}&limit=${limit}`),

  // Tags
  getTags: () => 
    api.get('/tags'),
  
  getPopularTags: (limit = 20) => 
    api.get(`/tags/popular?limit=${limit}`),
  
  getTag: (slug: string) => 
    api.get(`/tags/${slug}`),
  
  getTagPosts: (slug: string, page = 1, limit = 10) => 
    api.get(`/tags/${slug}/posts?page=${page}&limit=${limit}`),

  // Authors
  getAuthors: () => 
    api.get('/authors'),
  
  getAuthor: (id: string) => 
    api.get(`/authors/${id}`),
  
  getAuthorPosts: (id: string, page = 1, limit = 10) => 
    api.get(`/authors/${id}/posts?page=${page}&limit=${limit}`),

  // Search
  globalSearch: (query: string, limit = 10) => 
    api.get(`/search?q=${encodeURIComponent(query)}&limit=${limit}`),
  
  getSearchSuggestions: (query: string, limit = 5) => 
    api.get(`/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`),
};

export { ApiError }; 