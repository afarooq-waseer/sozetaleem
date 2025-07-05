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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
const categories = [
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

useHead({
  title: 'Categories - Soze Taleem',
  meta: [
    { name: 'description', content: 'Browse educational content by category and subject area.' }
  ]
})
</script> 