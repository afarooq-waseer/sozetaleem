<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Post Image/Icon -->
    <div 
      :class="[
        'h-48 flex items-center justify-center',
        imageGradient
      ]"
    >
      <div v-if="post.image" class="w-full h-full">
        <NuxtImg 
          :src="post.image" 
          :alt="post.title"
          class="w-full h-full object-cover"
        />
      </div>
      <UIcon 
        v-else
        :name="post.icon || 'i-heroicons-document-text'" 
        class="h-16 w-16 text-white" 
      />
    </div>
    
    <!-- Post Content -->
    <div class="p-6">
      <!-- Category Badge -->
      <div class="flex items-center mb-2">
        <UBadge 
          :color="post.category?.color || 'primary'" 
          variant="soft"
        >
          {{ post.category?.name || 'General' }}
        </UBadge>
      </div>
      
      <!-- Title -->
      <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ post.title }}
      </h3>
      
      <!-- Excerpt -->
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ post.excerpt || post.description }}
      </p>
      
      <!-- Post Meta -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <div class="flex items-center">
            <UIcon name="i-heroicons-calendar-days" class="h-4 w-4 mr-1" />
            <span>{{ formatDate(post.createdAt || post.date) }}</span>
          </div>
          <div class="flex items-center">
            <UIcon name="i-heroicons-clock" class="h-4 w-4 mr-1" />
            <span>{{ post.readTime || '5 min' }} read</span>
          </div>
        </div>
      </div>
      
      <!-- Read More Button -->
      <UButton 
        variant="ghost" 
        size="sm" 
        :to="post.to || `/posts/${post.slug}`"
        class="group"
      >
        Read More
        <UIcon 
          name="i-heroicons-arrow-right" 
          class="ml-1 group-hover:translate-x-1 transition-transform" 
        />
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// Generate gradient based on category or random
const imageGradient = computed(() => {
  const gradients = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-teal-400 to-teal-600'
  ]
  
  if (props.post.category?.gradient) {
    return props.post.category.gradient
  }
  
  // Generate consistent gradient based on title
  const index = props.post.title.length % gradients.length
  return gradients[index]
})

// Format date helper
const formatDate = (date) => {
  if (!date) return ''
  
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 