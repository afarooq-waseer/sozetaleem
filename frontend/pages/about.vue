<template>
  <div>
    <HeroSection 
      title="About Soze Taleem"
      subtitle="Honoring the legacy of meaningful education and knowledge sharing"
      size="medium"
      background="dark"
    />
    
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg mx-auto">
          <p class="text-xl text-gray-600 mb-8">
            This educational platform was created to continue the legacy of meaningful education and knowledge sharing.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p class="text-gray-600">
                To provide accessible, quality educational content that inspires learning and personal growth.
              </p>
            </div>
            
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p class="text-gray-600">
                To create a lasting impact through education, continuing the tradition of meaningful knowledge sharing.
              </p>
            </div>
          </div>
          
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">In Memory</h3>
            <p class="text-gray-600">
              This website is dedicated to preserving and continuing the educational legacy that began with a simple blog. 
              Every post shared here carries forward the spirit of learning and enlightenment.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'About - Soze Taleem',
  meta: [
    { name: 'description', content: 'Learn about our mission to continue the legacy of meaningful education and knowledge sharing.' }
  ]
})
</script> 