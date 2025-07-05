<template>
  <div>
    <HeroSection 
      title="Educational Posts"
      subtitle="Explore our collection of educational content and insights"
      size="medium"
      :buttons="[
        { text: 'All Categories', icon: 'i-heroicons-squares-plus', to: '/categories', variant: 'outline' }
      ]"
    />
    
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p class="text-lg text-gray-600">We're working on bringing you amazing educational content.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard 
            v-for="post in samplePosts" 
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Sample posts data
const samplePosts = [
  {
    id: 1,
    title: "The Art of Learning",
    excerpt: "Discover effective learning strategies and techniques that can transform your educational journey.",
    category: { name: "Education", color: "primary" },
    icon: "i-heroicons-light-bulb",
    slug: "art-of-learning",
    date: "2024-01-15",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Building Critical Thinking",
    excerpt: "Learn how to develop analytical skills and approach problems with a critical mindset.",
    category: { name: "Knowledge", color: "green" },
    icon: "i-heroicons-academic-cap",
    slug: "critical-thinking",
    date: "2024-01-10",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Pursuing Excellence",
    excerpt: "Motivation and guidance for those striving to achieve their best in educational pursuits.",
    category: { name: "Inspiration", color: "purple" },
    icon: "i-heroicons-rocket-launch",
    slug: "pursuing-excellence",
    date: "2024-01-05",
    readTime: "6 min"
  }
]

// SEO
useHead({
  title: 'Educational Posts - Soze Taleem',
  meta: [
    { name: 'description', content: 'Explore our collection of educational posts and insights on various topics.' }
  ]
})
</script> 