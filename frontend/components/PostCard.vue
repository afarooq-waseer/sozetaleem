<template>
  <article class="group bg-white border-2 border-black hover:border-accent transition-colors">
    <!-- Post Image/Icon -->
    <div class="aspect-video bg-gray-100 relative overflow-hidden">
      <div v-if="post.image" class="absolute inset-0">
        <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
      </div>
      <div v-else class="absolute inset-0 flex items-center justify-center bg-gray-100">
        <Icon :name="post.icon || 'ph:article-bold'" class="w-16 h-16 text-gray-400" />
      </div>
      
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span 
          :class="`${getCategoryBadgeClass(post.category)} px-3 py-1 text-xs font-bold uppercase tracking-tight`"
        >
          {{ post.category }}
        </span>
      </div>
      
      <!-- Reading Time -->
      <div class="absolute bottom-4 right-4">
        <div class="bg-black bg-opacity-70 text-white px-2 py-1 text-xs font-medium">
          {{ post.readingTime }}
        </div>
      </div>
    </div>
    
    <!-- Post Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-black mb-2 leading-tight group-hover:text-accent transition-colors">
        {{ post.title }}
      </h3>
      
      <p class="text-gray-600 text-sm leading-relaxed mb-4">
        {{ post.excerpt }}
      </p>
      
      <!-- Meta Information -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="text-xs text-gray-500 uppercase tracking-tight">
            {{ formatDate(post.date) }}
          </span>
          <span class="text-xs text-gray-500 uppercase tracking-tight">
            {{ post.readingTime }}
          </span>
        </div>
        
        <!-- Read More Button -->
        <NuxtLink 
          :to="`/posts/${post.slug}`"
          class="inline-flex items-center text-xs text-black hover:text-accent transition-colors uppercase tracking-tight font-semibold"
        >
          Read More
          <Icon name="ph:arrow-right-bold" class="ml-1 w-3 h-3" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// Format date to a readable format
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Get category badge class based on category
const getCategoryBadgeClass = (category) => {
  const categoryClasses = {
    'science': 'badge-accent',
    'literature': 'badge-pink',
    'history': 'badge-blue',
    'philosophy': 'badge-black',
    'education': 'badge-accent',
    'featured': 'badge-accent',
    'thinking': 'badge-black',
    'growth': 'badge-blue',
    'default': 'badge-black'
  }
  
  return categoryClasses[category?.toLowerCase()] || categoryClasses.default
}
</script> 