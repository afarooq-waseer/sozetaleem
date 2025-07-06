/**
 * API composable for handling backend API calls
 */
export const useApi = () => {
  const config = useRuntimeConfig()
  
  const apiCall = async (endpoint: string, options: any = {}) => {
    try {
      const response = await $fetch(endpoint, {
        baseURL: config.public.apiBase,
        ...options
      })
      return { data: response, error: null }
    } catch (error) {
      console.error('API Error:', error)
      return { data: null, error }
    }
  }

  return {
    apiCall
  }
}

/**
 * Categories API composable
 */
export const useCategories = () => {
  const { apiCall } = useApi()
  
  const fetchCategories = async () => {
    const { data, error } = await apiCall('/categories')
    return { categories: data, error }
  }
  
  const fetchCategoryBySlug = async (slug: string) => {
    const { data, error } = await apiCall(`/categories/${slug}`)
    return { category: data, error }
  }
  
  const fetchCategoryPosts = async (slug: string) => {
    const { data, error } = await apiCall(`/categories/${slug}/posts`)
    return { posts: data, error }
  }
  
  return {
    fetchCategories,
    fetchCategoryBySlug,
    fetchCategoryPosts
  }
}

/**
 * Posts API composable
 */
export const usePosts = () => {
  const { apiCall } = useApi()
  
  const fetchPosts = async (options: any = {}) => {
    const { data, error } = await apiCall('/posts', { query: options })
    return { posts: data, error }
  }
  
  const fetchPostBySlug = async (slug: string) => {
    const { data, error } = await apiCall(`/posts/${slug}`)
    return { post: data, error }
  }
  
  const fetchFeaturedPosts = async () => {
    const { data, error } = await apiCall('/posts/featured')
    return { posts: data, error }
  }
  
  const fetchRecentPosts = async () => {
    const { data, error } = await apiCall('/posts/recent')
    return { posts: data, error }
  }
  
  return {
    fetchPosts,
    fetchPostBySlug,
    fetchFeaturedPosts,
    fetchRecentPosts
  }
} 