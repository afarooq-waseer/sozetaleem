<template>
  <NuxtLink 
    :to="category.to || `/categories/${category.slug}`"
    class="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow group block"
  >
    <!-- Category Icon -->
    <div 
      :class="[
        'h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors',
        iconBackground,
        iconHoverBackground
      ]"
    >
      <UIcon 
        :name="category.icon || 'i-heroicons-folder'" 
        :class="[
          'h-6 w-6',
          iconColor
        ]"
      />
    </div>
    
    <!-- Category Name -->
    <h3 class="font-semibold text-gray-900 mb-2">
      {{ category.name }}
    </h3>
    
    <!-- Post Count -->
    <p class="text-sm text-gray-600">
      {{ category.postCount || 0 }} Post{{ (category.postCount || 0) === 1 ? '' : 's' }}
    </p>
    
    <!-- Description (optional) -->
    <p v-if="category.description" class="text-xs text-gray-500 mt-2 line-clamp-2">
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

// Color mappings for different categories
const colorMappings = {
  science: { bg: 'bg-blue-100', hover: 'group-hover:bg-blue-200', text: 'text-blue-600' },
  literature: { bg: 'bg-green-100', hover: 'group-hover:bg-green-200', text: 'text-green-600' },
  history: { bg: 'bg-yellow-100', hover: 'group-hover:bg-yellow-200', text: 'text-yellow-600' },
  philosophy: { bg: 'bg-purple-100', hover: 'group-hover:bg-purple-200', text: 'text-purple-600' },
  mathematics: { bg: 'bg-red-100', hover: 'group-hover:bg-red-200', text: 'text-red-600' },
  language: { bg: 'bg-pink-100', hover: 'group-hover:bg-pink-200', text: 'text-pink-600' },
  technology: { bg: 'bg-indigo-100', hover: 'group-hover:bg-indigo-200', text: 'text-indigo-600' },
  arts: { bg: 'bg-orange-100', hover: 'group-hover:bg-orange-200', text: 'text-orange-600' },
  default: { bg: 'bg-gray-100', hover: 'group-hover:bg-gray-200', text: 'text-gray-600' }
}

// Get colors based on category type or custom color
const getColors = () => {
  if (props.category.colors) {
    return props.category.colors
  }
  
  const slug = props.category.slug?.toLowerCase() || props.category.name?.toLowerCase() || 'default'
  
  // Check if slug matches any predefined color mapping
  for (const [key, colors] of Object.entries(colorMappings)) {
    if (slug.includes(key)) {
      return colors
    }
  }
  
  return colorMappings.default
}

const colors = getColors()

const iconBackground = computed(() => colors.bg)
const iconHoverBackground = computed(() => colors.hover)
const iconColor = computed(() => colors.text)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 