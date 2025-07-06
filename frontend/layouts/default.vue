<template>
  <div class="min-h-screen bg-white">
    <!-- Header with Wired-style minimal design -->
    <header class="bg-white border-b-2 border-b-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2 group">
              <div class="w-8 h-8 bg-accent rounded-none flex items-center justify-center group-hover:bg-black transition-colors">
                <Icon name="ph:graduation-cap-bold" class="w-5 h-5 text-black group-hover:text-white" />
              </div>
              <span class="text-2xl font-black tracking-tighter text-black">SOZE TALEEM</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-black hover:text-accent transition-colors font-medium text-sm uppercase tracking-tight">
              Home
            </NuxtLink>
            <NuxtLink to="/posts" class="text-black hover:text-accent transition-colors font-medium text-sm uppercase tracking-tight">
              Posts
            </NuxtLink>
            
            <!-- Categories Dropdown -->
            <div class="relative group">
              <button 
                class="flex items-center text-black hover:text-accent transition-colors font-medium text-sm uppercase tracking-tight"
                @click="toggleCategoriesDropdown"
              >
                Categories
                <Icon name="ph:caret-down-bold" class="ml-1 w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': categoriesDropdownOpen }" />
              </button>
              
              <!-- Categories Dropdown Menu -->
              <div 
                v-if="categoriesDropdownOpen"
                class="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-black shadow-lg z-50"
                @click="closeCategoriesDropdown"
              >
                <div class="py-2">
                  <NuxtLink 
                    to="/categories" 
                    class="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors font-medium uppercase tracking-tight"
                  >
                    All Categories
                  </NuxtLink>
                  <div class="border-t border-gray-200 my-1"></div>
                  
                  <!-- Loading State -->
                  <div v-if="categoriesLoading" class="px-4 py-2 text-sm text-gray-500">
                    Loading categories...
                  </div>
                  
                  <!-- Categories List -->
                  <template v-else-if="categories?.length">
                    <NuxtLink
                      v-for="category in categories.slice(0, 6)"
                      :key="category.id"
                      :to="`/categories/${category.slug}`"
                      class="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                    >
                      <div class="flex items-center justify-between">
                        <span class="font-medium">{{ category.name }}</span>
                        <span class="text-xs text-gray-500">{{ category.postCount || 0 }}</span>
                      </div>
                    </NuxtLink>
                  </template>
                  
                  <!-- Error State -->
                  <div v-else class="px-4 py-2 text-sm text-gray-500">
                    No categories available
                  </div>
                </div>
              </div>
            </div>
            
            <NuxtLink to="/about" class="text-black hover:text-accent transition-colors font-medium text-sm uppercase tracking-tight">
              About
            </NuxtLink>
          </nav>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu" 
            class="md:hidden inline-flex items-center justify-center p-2 text-black hover:text-accent transition-colors"
          >
            <Icon :name="mobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="w-6 h-6" />
          </button>
        </div>
      </div>

                <!-- Mobile Navigation -->
          <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <NuxtLink 
                to="/" 
                class="block px-3 py-2 text-black hover:bg-gray-100 transition-colors font-medium text-sm uppercase tracking-tight"
                @click="closeMobileMenu"
              >
                Home
              </NuxtLink>
              <NuxtLink 
                to="/posts" 
                class="block px-3 py-2 text-black hover:bg-gray-100 transition-colors font-medium text-sm uppercase tracking-tight"
                @click="closeMobileMenu"
              >
                Posts
              </NuxtLink>
              
              <!-- Mobile Categories Section -->
              <div class="border-t border-gray-200 pt-2">
                <div class="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-tight">
                  Categories
                </div>
                <NuxtLink 
                  to="/categories" 
                  class="block px-3 py-2 text-black hover:bg-gray-100 transition-colors font-medium text-sm uppercase tracking-tight"
                  @click="closeMobileMenu"
                >
                  All Categories
                </NuxtLink>
                
                <!-- Mobile Categories List -->
                <template v-if="categories?.length">
                  <NuxtLink
                    v-for="category in categories.slice(0, 4)"
                    :key="category.id"
                    :to="`/categories/${category.slug}`"
                    class="block px-3 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                    @click="closeMobileMenu"
                  >
                    {{ category.name }}
                  </NuxtLink>
                </template>
              </div>
              
              <NuxtLink 
                to="/about" 
                class="block px-3 py-2 text-black hover:bg-gray-100 transition-colors font-medium text-sm uppercase tracking-tight"
                @click="closeMobileMenu"
              >
                About
              </NuxtLink>
            </div>
          </div>
    </header>

    <!-- Main Content -->
    <main class="min-h-screen bg-white">
      <NuxtPage />
    </main>

    <!-- Footer with Wired-style minimal design -->
    <footer class="bg-black text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand Section -->
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-accent rounded-none flex items-center justify-center">
                <Icon name="ph:graduation-cap-bold" class="w-5 h-5 text-black" />
              </div>
              <span class="text-xl font-black tracking-tighter">SOZE TALEEM</span>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
              Continuing the educational legacy through modern digital platforms.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white font-bold text-sm uppercase tracking-tight mb-4">Navigate</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/posts" class="text-gray-300 hover:text-accent transition-colors text-sm">
                  All Posts
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/categories" class="text-gray-300 hover:text-accent transition-colors text-sm">
                  Categories
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="text-gray-300 hover:text-accent transition-colors text-sm">
                  About
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-white font-bold text-sm uppercase tracking-tight mb-4">Connect</h3>
            <div class="space-y-2">
              <p class="text-gray-300 text-sm">
                Educational Content Platform
              </p>
              <p class="text-gray-300 text-sm">
                Built with ❤️ for Learning
              </p>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-300 text-sm">
            &copy; {{ new Date().getFullYear() }} Soze Taleem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Categories dropdown state
const categoriesDropdownOpen = ref(false)
const categories = ref([])
const categoriesLoading = ref(true)

// Use categories composable
const { fetchCategories } = useCategories()

// Mobile menu functions
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // Close categories dropdown when opening mobile menu
  if (mobileMenuOpen.value) {
    categoriesDropdownOpen.value = false
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Categories dropdown functions
const toggleCategoriesDropdown = () => {
  categoriesDropdownOpen.value = !categoriesDropdownOpen.value
  // Close mobile menu when opening categories dropdown
  if (categoriesDropdownOpen.value) {
    mobileMenuOpen.value = false
  }
}

const closeCategoriesDropdown = () => {
  categoriesDropdownOpen.value = false
}

// Load categories on mount
onMounted(async () => {
  try {
    const { categories: fetchedCategories, error } = await fetchCategories()
    
    if (error) {
      console.error('Error fetching categories:', error)
      // Fall back to default categories for demonstration
      categories.value = [
        { id: 1, name: 'Science', slug: 'science', postCount: 12 },
        { id: 2, name: 'Literature', slug: 'literature', postCount: 8 },
        { id: 3, name: 'History', slug: 'history', postCount: 15 },
        { id: 4, name: 'Philosophy', slug: 'philosophy', postCount: 6 },
        { id: 5, name: 'Mathematics', slug: 'mathematics', postCount: 10 },
        { id: 6, name: 'Technology', slug: 'technology', postCount: 9 }
      ]
    } else {
      categories.value = fetchedCategories || []
    }
  } catch (err) {
    console.error('Error loading categories:', err)
    // Fall back to default categories
    categories.value = [
      { id: 1, name: 'Science', slug: 'science', postCount: 12 },
      { id: 2, name: 'Literature', slug: 'literature', postCount: 8 },
      { id: 3, name: 'History', slug: 'history', postCount: 15 },
      { id: 4, name: 'Philosophy', slug: 'philosophy', postCount: 6 },
      { id: 5, name: 'Mathematics', slug: 'mathematics', postCount: 10 },
      { id: 6, name: 'Technology', slug: 'technology', postCount: 9 }
    ]
  } finally {
    categoriesLoading.value = false
  }
})

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('.relative.group')) {
    categoriesDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 