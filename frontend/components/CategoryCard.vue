<template>
  <NuxtLink 
    :to="`/categories/${category.slug}`"
    class="bg-white border-2 border-black p-6 group hover:border-accent transition-colors block"
  >
    <div class="flex items-center mb-4">
      <div :class="`w-12 h-12 ${getCategoryColor(category.name)} rounded-none flex items-center justify-center mr-3`">
        <Icon :name="category.icon || 'ph:folder-bold'" class="w-6 h-6" :class="getIconColor(category.name)" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-black group-hover:text-accent transition-colors uppercase tracking-tight">
          {{ category.name }}
        </h3>
        <p class="text-xs text-gray-500 uppercase tracking-tight">
          {{ category.postCount || 0 }} Posts
        </p>
      </div>
    </div>
    
    <p class="text-sm text-gray-600 leading-relaxed">
      {{ category.description }}
    </p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

// Get category background color
const getCategoryColor = (categoryName) => {
  const colorMap = {
    'science': 'bg-accent',
    'literature': 'bg-accent-alt',
    'history': 'bg-accent-blue',
    'philosophy': 'bg-black',
    'education': 'bg-accent',
    'technology': 'bg-accent-blue',
    'arts': 'bg-accent-alt',
    'default': 'bg-black'
  }
  
  return colorMap[categoryName?.toLowerCase()] || colorMap.default
}

// Get icon color based on background
const getIconColor = (categoryName) => {
  const iconColorMap = {
    'science': 'text-black',
    'literature': 'text-white',
    'history': 'text-white',
    'philosophy': 'text-white',
    'education': 'text-black',
    'technology': 'text-white',
    'arts': 'text-white',
    'default': 'text-white'
  }
  
  return iconColorMap[categoryName?.toLowerCase()] || iconColorMap.default
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 