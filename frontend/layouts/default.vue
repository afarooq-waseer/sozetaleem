<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Title -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <UIcon name="i-heroicons-academic-cap" class="h-8 w-8 text-primary-600" />
              <span class="text-xl font-bold text-gray-900">Soze Taleem</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </NuxtLink>
              <NuxtLink to="/posts" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Posts
              </NuxtLink>
              <NuxtLink to="/categories" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Categories
              </NuxtLink>
              <NuxtLink to="/about" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </NuxtLink>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <UButton 
              variant="ghost" 
              size="sm"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <UIcon name="i-heroicons-bars-3" class="h-6 w-6" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </NuxtLink>
          <NuxtLink to="/posts" class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
            Posts
          </NuxtLink>
          <NuxtLink to="/categories" class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
            Categories
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
            About
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- About Section -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <UIcon name="i-heroicons-academic-cap" class="h-8 w-8 text-primary-400" />
              <span class="text-xl font-bold">Soze Taleem</span>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
              An educational platform dedicated to sharing knowledge and inspiring learning. 
              Continuing the legacy of meaningful education and enlightenment.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-white text-sm transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/posts" class="text-gray-300 hover:text-white text-sm transition-colors">All Posts</NuxtLink></li>
              <li><NuxtLink to="/categories" class="text-gray-300 hover:text-white text-sm transition-colors">Categories</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-300 hover:text-white text-sm transition-colors">About</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul class="space-y-2">
              <li class="flex items-center space-x-2">
                <UIcon name="i-heroicons-envelope" class="h-4 w-4 text-gray-400" />
                <span class="text-gray-300 text-sm">contact@sozetaleem.com</span>
              </li>
              <li class="flex items-center space-x-2">
                <UIcon name="i-heroicons-globe-alt" class="h-4 w-4 text-gray-400" />
                <span class="text-gray-300 text-sm">www.sozetaleem.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-800">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">
              © {{ new Date().getFullYear() }} Soze Taleem. Made with ❤️ in memory of inspiring education.
            </p>
            <div class="mt-4 md:mt-0 flex space-x-6">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <UIcon name="i-heroicons-heart" class="h-5 w-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script> 