<template>
  <div class="bg-white">
    <!-- Hero Section with Wired-style bold typography -->
    <section class="relative overflow-hidden bg-white py-24 lg:py-32">
      <!-- Minimal background pattern -->
      <div class="absolute inset-0 pattern-dots opacity-10"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black mb-8 leading-tight">
            SOZE
            <br>
            <span class="text-accent">TALEEM</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-snug">
            Educational content that challenges, inspires, and transforms thinking. 
            Continuing the legacy of meaningful learning.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/posts" 
              class="inline-flex items-center px-8 py-4 bg-black text-white font-semibold text-sm uppercase tracking-tight hover:bg-accent hover:text-black transition-colors border-2 border-black"
            >
              Explore Posts
              <Icon name="ph:arrow-right-bold" class="ml-2 w-4 h-4" />
            </NuxtLink>
            
            <NuxtLink 
              to="/categories" 
              class="inline-flex items-center px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-tight hover:bg-black hover:text-white transition-colors border-2 border-black"
            >
              Browse Categories
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Content with Wired-style minimal design -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-black mb-4">
            FEATURED
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated educational content designed to expand your intellectual horizons.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Featured Posts -->
          <article class="group bg-white border-2 border-black hover:border-accent transition-colors">
            <div class="aspect-video bg-gray-100 relative overflow-hidden">
              <div class="absolute inset-0 bg-black opacity-20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Icon name="ph:brain-bold" class="w-16 h-16 text-white" />
              </div>
              <div class="absolute top-4 left-4">
                <span class="badge-accent px-3 py-1 text-xs font-bold">FEATURED</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-black mb-2 group-hover:text-accent transition-colors">
                The Art of Learning
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                Exploring effective strategies and methodologies for lifelong learning and intellectual growth.
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 uppercase tracking-tight">5 min read</span>
                <NuxtLink 
                  to="/posts" 
                  class="text-xs text-black hover:text-accent transition-colors uppercase tracking-tight font-semibold"
                >
                  Read More
                </NuxtLink>
              </div>
            </div>
          </article>

          <article class="group bg-white border-2 border-black hover:border-accent transition-colors">
            <div class="aspect-video bg-gray-100 relative overflow-hidden">
              <div class="absolute inset-0 bg-black opacity-20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Icon name="ph:lightbulb-bold" class="w-16 h-16 text-white" />
              </div>
              <div class="absolute top-4 left-4">
                <span class="badge-black px-3 py-1 text-xs font-bold">THINKING</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-black mb-2 group-hover:text-accent transition-colors">
                Critical Thinking
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                Developing analytical skills and logical reasoning for better decision-making in complex situations.
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 uppercase tracking-tight">7 min read</span>
                <NuxtLink 
                  to="/posts" 
                  class="text-xs text-black hover:text-accent transition-colors uppercase tracking-tight font-semibold"
                >
                  Read More
                </NuxtLink>
              </div>
            </div>
          </article>

          <article class="group bg-white border-2 border-black hover:border-accent transition-colors">
            <div class="aspect-video bg-gray-100 relative overflow-hidden">
              <div class="absolute inset-0 bg-black opacity-20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Icon name="ph:target-bold" class="w-16 h-16 text-white" />
              </div>
              <div class="absolute top-4 left-4">
                <span class="badge-blue px-3 py-1 text-xs font-bold">GROWTH</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-black mb-2 group-hover:text-accent transition-colors">
                Pursuing Excellence
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                Understanding the principles and practices that lead to mastery and excellence in any field.
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 uppercase tracking-tight">6 min read</span>
                <NuxtLink 
                  to="/posts" 
                  class="text-xs text-black hover:text-accent transition-colors uppercase tracking-tight font-semibold"
                >
                  Read More
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-black mb-4">
            CATEGORIES
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore diverse subjects and expand your knowledge across multiple disciplines.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Categories -->
          <div class="bg-white border-2 border-black p-6 group hover:border-accent transition-colors">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-accent rounded-none flex items-center justify-center mr-3">
                <Icon name="ph:flask-bold" class="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-black group-hover:text-accent transition-colors">
                  SCIENCE
                </h3>
                <p class="text-xs text-gray-500 uppercase tracking-tight">12 Posts</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">
              Exploring scientific concepts, discoveries, and innovations that shape our world.
            </p>
          </div>

          <div class="bg-white border-2 border-black p-6 group hover:border-accent transition-colors">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-accent-alt rounded-none flex items-center justify-center mr-3">
                <Icon name="ph:book-bold" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-black group-hover:text-accent transition-colors">
                  LITERATURE
                </h3>
                <p class="text-xs text-gray-500 uppercase tracking-tight">8 Posts</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">
              Analyzing literary works, writing techniques, and the power of storytelling.
            </p>
          </div>

          <div class="bg-white border-2 border-black p-6 group hover:border-accent transition-colors">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-accent-blue rounded-none flex items-center justify-center mr-3">
                <Icon name="ph:clock-bold" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-black group-hover:text-accent transition-colors">
                  HISTORY
                </h3>
                <p class="text-xs text-gray-500 uppercase tracking-tight">15 Posts</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">
              Understanding historical events, patterns, and lessons from the past.
            </p>
          </div>

          <div class="bg-white border-2 border-black p-6 group hover:border-accent transition-colors">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-black rounded-none flex items-center justify-center mr-3">
                <Icon name="ph:question-bold" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-black group-hover:text-accent transition-colors">
                  PHILOSOPHY
                </h3>
                <p class="text-xs text-gray-500 uppercase tracking-tight">10 Posts</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">
              Exploring fundamental questions about existence, knowledge, and values.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-black text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
          START
          <br>
          <span class="text-accent">LEARNING</span>
        </h2>
        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          Join thousands of learners who are expanding their minds and challenging their thinking every day.
        </p>
        <NuxtLink 
          to="/posts" 
          class="inline-flex items-center px-8 py-4 bg-accent text-black font-semibold text-sm uppercase tracking-tight hover:bg-white transition-colors border-2 border-accent"
        >
          Begin Your Journey
          <Icon name="ph:arrow-right-bold" class="ml-2 w-4 h-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta Tags
useSeoMeta({
  title: 'Soze Taleem - Educational Content Platform',
  ogTitle: 'Soze Taleem - Educational Content Platform',
  description: 'Discover educational content that challenges, inspires, and transforms thinking. Continuing the legacy of meaningful learning.',
  ogDescription: 'Discover educational content that challenges, inspires, and transforms thinking. Continuing the legacy of meaningful learning.',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://sozetaleem.com',
  twitterCard: 'summary_large_image',
})

// Page animations
onMounted(() => {
  const elements = document.querySelectorAll('.fade-in')
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-fadeIn')
    }, index * 200)
  })
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