<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-repeat pattern-dots"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="text-center fade-in">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 font-heading">
            Welcome to Soze Taleem
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Continuing the legacy of meaningful education and knowledge sharing. 
            Explore our collection of educational content and enlightening posts.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center slide-up">
            <UButton 
              size="lg" 
              color="white" 
              variant="solid"
              to="/posts"
              class="inline-flex items-center hover:scale-105 transition-transform shadow-lg"
            >
              <UIcon name="i-heroicons-book-open" class="mr-2" />
              Explore Posts
            </UButton>
            <UButton 
              size="lg" 
              color="white" 
              variant="outline"
              to="/about"
              class="inline-flex items-center hover:scale-105 transition-transform"
            >
              <UIcon name="i-heroicons-heart" class="mr-2" />
              About This Journey
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Featured Educational Content
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most impactful educational posts and resources
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Featured Post Card 1 -->
          <div class="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 slide-up">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <UIcon name="i-heroicons-light-bulb" class="h-16 w-16 text-white animate-pulse-slow" />
            </div>
            <div class="p-6">
              <div class="flex items-center mb-2">
                <UBadge color="primary" variant="soft" class="font-medium">Education</UBadge>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2 font-heading">
                The Art of Learning
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                Discover effective learning strategies and techniques that can transform your educational journey.
              </p>
              <UButton variant="ghost" size="sm" to="/posts" class="group hover:bg-primary-50">
                Read More
                <UIcon name="i-heroicons-arrow-right" class="ml-1 group-hover:translate-x-1 transition-transform" />
              </UButton>
            </div>
          </div>

          <!-- Featured Post Card 2 -->
          <div class="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 slide-up" style="animation-delay: 0.1s">
            <div class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <UIcon name="i-heroicons-academic-cap" class="h-16 w-16 text-white animate-pulse-slow" />
            </div>
            <div class="p-6">
              <div class="flex items-center mb-2">
                <UBadge color="green" variant="soft" class="font-medium">Knowledge</UBadge>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2 font-heading">
                Building Critical Thinking
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                Learn how to develop analytical skills and approach problems with a critical mindset.
              </p>
              <UButton variant="ghost" size="sm" to="/posts" class="group hover:bg-green-50">
                Read More
                <UIcon name="i-heroicons-arrow-right" class="ml-1 group-hover:translate-x-1 transition-transform" />
              </UButton>
            </div>
          </div>

          <!-- Featured Post Card 3 -->
          <div class="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 slide-up" style="animation-delay: 0.2s">
            <div class="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <UIcon name="i-heroicons-rocket-launch" class="h-16 w-16 text-white animate-pulse-slow" />
            </div>
            <div class="p-6">
              <div class="flex items-center mb-2">
                <UBadge color="purple" variant="soft" class="font-medium">Inspiration</UBadge>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2 font-heading">
                Pursuing Excellence
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                Motivation and guidance for those striving to achieve their best in educational pursuits.
              </p>
              <UButton variant="ghost" size="sm" to="/posts" class="group hover:bg-purple-50">
                Read More
                <UIcon name="i-heroicons-arrow-right" class="ml-1 group-hover:translate-x-1 transition-transform" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Explore by Category
          </h2>
          <p class="text-lg text-gray-600">
            Find educational content organized by topic and subject area
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <!-- Category 1 -->
          <NuxtLink 
            to="/categories" 
            class="bg-white rounded-lg p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105 group slide-up"
          >
            <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <UIcon name="i-heroicons-beaker" class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2 font-heading">Science</h3>
            <p class="text-sm text-gray-600">12 Posts</p>
          </NuxtLink>

          <!-- Category 2 -->
          <NuxtLink 
            to="/categories" 
            class="bg-white rounded-lg p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105 group slide-up"
            style="animation-delay: 0.1s"
          >
            <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <UIcon name="i-heroicons-book-open" class="h-6 w-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2 font-heading">Literature</h3>
            <p class="text-sm text-gray-600">8 Posts</p>
          </NuxtLink>

          <!-- Category 3 -->
          <NuxtLink 
            to="/categories" 
            class="bg-white rounded-lg p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105 group slide-up"
            style="animation-delay: 0.2s"
          >
            <div class="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
              <UIcon name="i-heroicons-globe-alt" class="h-6 w-6 text-yellow-600" />
            </div>
                         <h3 class="font-semibold text-gray-900 mb-2 font-heading">History</h3>
            <p class="text-sm text-gray-600">15 Posts</p>
          </NuxtLink>

          <!-- Category 4 -->
          <NuxtLink 
            to="/categories" 
            class="bg-white rounded-lg p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105 group slide-up"
            style="animation-delay: 0.3s"
          >
            <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <UIcon name="i-heroicons-light-bulb" class="h-6 w-6 text-purple-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2 font-heading">Philosophy</h3>
            <p class="text-sm text-gray-600">6 Posts</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-primary-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
          Continue the Journey of Learning
        </h2>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">
          Join us in honoring the legacy of meaningful education. Every post, every insight, 
          every moment of learning contributes to a brighter future.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center bounce-in">
          <UButton 
            size="lg" 
            color="primary" 
            to="/posts"
            class="inline-flex items-center hover:scale-105 transition-transform shadow-lg"
          >
            <UIcon name="i-heroicons-book-open" class="mr-2" />
            Browse All Posts
          </UButton>
          <UButton 
            size="lg" 
            variant="outline" 
            color="primary"
            to="/about"
            class="inline-flex items-center hover:scale-105 transition-transform"
          >
            <UIcon name="i-heroicons-information-circle" class="mr-2" />
            Learn More About Us
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO and Meta
useHead({
  title: 'Soze Taleem - Educational Content & Knowledge Sharing',
  meta: [
    {
      name: 'description',
      content: 'An educational platform dedicated to sharing knowledge and inspiring learning. Explore our collection of educational content and enlightening posts.'
    },
    {
      property: 'og:title',
      content: 'Soze Taleem - Educational Content & Knowledge Sharing'
    },
    {
      property: 'og:description',
      content: 'An educational platform dedicated to sharing knowledge and inspiring learning. Explore our collection of educational content and enlightening posts.'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>

<style scoped>
.pattern-dots {
  background-image: radial-gradient(circle, white 2px, transparent 2px);
  background-size: 50px 50px;
}

.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

.slide-up {
  animation: slideUp 0.6s ease-in-out;
}

.bounce-in {
  animation: bounceIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
</style> 