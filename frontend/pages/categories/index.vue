<template>
  <div>
    <HeroSection 
      title="Categories"
      subtitle="Explore educational content by subject and topic"
      size="medium"
      :buttons="[
        { text: 'All Posts', icon: 'i-heroicons-book-open', to: '/posts' }
      ]"
    />
    
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <p class="mt-4 text-gray-600">Loading categories...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-500 mb-4">
            <Icon name="ph:warning-bold" class="w-12 h-12 mx-auto" />
          </div>
          <p class="text-gray-600 mb-4">Unable to load categories from the server.</p>
          <p class="text-sm text-gray-500">Showing default categories instead.</p>
        </div>
        
        <!-- Categories Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])
const loading = ref(true)
const error = ref(null)

// Use categories composable
const { fetchCategories } = useCategories()

// Default categories for fallback
const defaultCategories = [
  {
    id: 1,
    name: "Science",
    slug: "science",
    icon: "i-heroicons-beaker",
    postCount: 12,
    description: "Scientific concepts and discoveries"
  },
  {
    id: 2,
    name: "Literature",
    slug: "literature", 
    icon: "i-heroicons-book-open",
    postCount: 8,
    description: "Literary analysis and appreciation"
  },
  {
    id: 3,
    name: "History",
    slug: "history",
    icon: "i-heroicons-globe-alt", 
    postCount: 15,
    description: "Historical events and perspectives"
  },
  {
    id: 4,
    name: "Philosophy",
    slug: "philosophy",
    icon: "i-heroicons-light-bulb",
    postCount: 6,
    description: "Philosophical thoughts and ideas"
  },
  {
    id: 5,
    name: "Mathematics",
    slug: "mathematics",
    icon: "i-heroicons-calculator",
    postCount: 10,
    description: "Mathematical concepts and problem solving"
  },
  {
    id: 6,
    name: "Language",
    slug: "language",
    icon: "i-heroicons-language",
    postCount: 14,
    description: "Language learning and linguistics"
  },
  {
    id: 7,
    name: "Technology",
    slug: "technology",
    icon: "i-heroicons-computer-desktop",
    postCount: 9,
    description: "Technology and digital literacy"
  },
  {
    id: 8,
    name: "Arts",
    slug: "arts",
    icon: "i-heroicons-paint-brush",
    postCount: 7,
    description: "Creative arts and expression"
  }
]

// Load categories on mount
onMounted(async () => {
  try {
    const { categories: fetchedCategories, error: fetchError } = await fetchCategories()
    
    if (fetchError) {
      console.error('Error fetching categories:', fetchError)
      error.value = fetchError
      // Use default categories as fallback
      categories.value = defaultCategories
    } else {
      categories.value = fetchedCategories || defaultCategories
    }
  } catch (err) {
    console.error('Error loading categories:', err)
    error.value = err
    // Use default categories as fallback
    categories.value = defaultCategories
  } finally {
    loading.value = false
  }
})

useHead({
  title: 'Categories - Soze Taleem',
  meta: [
    { name: 'description', content: 'Browse educational content by category and subject area.' }
  ]
})
</script> 