<template>
  <section 
    :class="[
      'text-white relative overflow-hidden',
      backgroundClass
    ]"
  >
    <!-- Background Pattern (optional) -->
    <div v-if="showPattern" class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-repeat pattern-dots"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div :class="textAlign">
        <!-- Pre-title (optional) -->
        <p v-if="preTitle" class="text-lg text-primary-200 mb-4">
          {{ preTitle }}
        </p>
        
        <!-- Title -->
        <h1 :class="titleClass">
          {{ title }}
        </h1>
        
        <!-- Subtitle -->
        <p v-if="subtitle" :class="subtitleClass">
          {{ subtitle }}
        </p>
        
        <!-- Buttons -->
        <div v-if="buttons && buttons.length > 0" class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <UButton 
            v-for="button in buttons"
            :key="button.text"
            :size="button.size || 'lg'"
            :color="button.color || 'white'"
            :variant="button.variant || 'solid'"
            :to="button.to"
            :href="button.href"
            :class="button.class"
            class="inline-flex items-center"
          >
            <UIcon v-if="button.icon" :name="button.icon" class="mr-2" />
            {{ button.text }}
          </UButton>
        </div>
        
        <!-- Custom slot for additional content -->
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  preTitle: {
    type: String,
    default: ''
  },
  buttons: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'large', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  align: {
    type: String,
    default: 'center', // left, center, right
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  background: {
    type: String,
    default: 'primary' // primary, secondary, success, warning, error, or custom gradient
  },
  showPattern: {
    type: Boolean,
    default: true
  }
})

// Computed classes
const textAlign = computed(() => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  return alignments[props.align] || alignments.center
})

const titleClass = computed(() => {
  const sizes = {
    small: 'text-2xl md:text-3xl font-bold mb-4',
    medium: 'text-3xl md:text-4xl font-bold mb-4',
    large: 'text-4xl md:text-6xl font-bold mb-6'
  }
  return sizes[props.size] || sizes.large
})

const subtitleClass = computed(() => {
  const sizes = {
    small: 'text-base md:text-lg text-primary-100 max-w-2xl',
    medium: 'text-lg md:text-xl text-primary-100 max-w-2xl',
    large: 'text-xl md:text-2xl text-primary-100 max-w-3xl'
  }
  const baseClass = sizes[props.size] || sizes.large
  const alignClass = props.align === 'center' ? 'mx-auto' : ''
  return `${baseClass} ${alignClass}`
})

const backgroundClass = computed(() => {
  const backgrounds = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700',
    success: 'bg-gradient-to-r from-green-600 to-green-700',
    warning: 'bg-gradient-to-r from-yellow-600 to-yellow-700',
    error: 'bg-gradient-to-r from-red-600 to-red-700',
    dark: 'bg-gradient-to-r from-gray-800 to-gray-900'
  }
  
  // If it's a custom gradient, use it directly
  if (props.background.startsWith('bg-gradient') || props.background.startsWith('from-')) {
    return props.background
  }
  
  return backgrounds[props.background] || backgrounds.primary
})
</script>

<style scoped>
.pattern-dots {
  background-image: radial-gradient(circle, white 2px, transparent 2px);
  background-size: 50px 50px;
}
</style> 