<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">API Test Page</h1>
    
    <!-- Test Results -->
    <div class="space-y-6">
      <!-- Categories Test -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Categories Test</h2>
        <button 
          @click="testCategories" 
          :disabled="loading.categories"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {{ loading.categories ? 'Loading...' : 'Test Categories API' }}
        </button>
        <div v-if="results.categories" class="mt-4">
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(results.categories, null, 2) }}</pre>
        </div>
      </div>

      <!-- Posts Test -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Posts Test</h2>
        <button 
          @click="testPosts" 
          :disabled="loading.posts"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {{ loading.posts ? 'Loading...' : 'Test Posts API' }}
        </button>
        <div v-if="results.posts" class="mt-4">
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(results.posts, null, 2) }}</pre>
        </div>
      </div>

      <!-- Tags Test -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Tags Test</h2>
        <button 
          @click="testTags" 
          :disabled="loading.tags"
          class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {{ loading.tags ? 'Loading...' : 'Test Tags API' }}
        </button>
        <div v-if="results.tags" class="mt-4">
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(results.tags, null, 2) }}</pre>
        </div>
      </div>

      <!-- Search Test -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Search Test</h2>
        <div class="flex gap-2 mb-4">
          <input 
            v-model="searchQuery" 
            placeholder="Enter search term..."
            class="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button 
            @click="testSearch" 
            :disabled="loading.search"
            class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {{ loading.search ? 'Searching...' : 'Search' }}
          </button>
        </div>
        <div v-if="results.search" class="mt-4">
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(results.search, null, 2) }}</pre>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { blogApi, ApiError } from '~/utils/api';

// Reactive state
const loading = ref({
  categories: false,
  posts: false,
  tags: false,
  search: false
});

const results = ref({
  categories: null,
  posts: null,
  tags: null,
  search: null
});

const error = ref('');
const searchQuery = ref('');

// Test functions
const testCategories = async () => {
  loading.value.categories = true;
  error.value = '';
  
  try {
    const data = await blogApi.getCategories();
    results.value.categories = data;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Unknown error occurred';
    console.error('Categories API Error:', err);
  } finally {
    loading.value.categories = false;
  }
};

const testPosts = async () => {
  loading.value.posts = true;
  error.value = '';
  
  try {
    const data = await blogApi.getPosts(1, 5);
    results.value.posts = data;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Unknown error occurred';
    console.error('Posts API Error:', err);
  } finally {
    loading.value.posts = false;
  }
};

const testTags = async () => {
  loading.value.tags = true;
  error.value = '';
  
  try {
    const data = await blogApi.getTags();
    results.value.tags = data;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Unknown error occurred';
    console.error('Tags API Error:', err);
  } finally {
    loading.value.tags = false;
  }
};

const testSearch = async () => {
  if (!searchQuery.value.trim()) {
    error.value = 'Please enter a search term';
    return;
  }
  
  loading.value.search = true;
  error.value = '';
  
  try {
    const data = await blogApi.globalSearch(searchQuery.value, 5);
    results.value.search = data;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Unknown error occurred';
    console.error('Search API Error:', err);
  } finally {
    loading.value.search = false;
  }
};

// Auto-test on page load
onMounted(() => {
  // Uncomment the line below to auto-test categories on page load
  // testCategories();
});
</script> 