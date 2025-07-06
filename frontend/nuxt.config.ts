// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image'
  ],
  
  // CSS Configuration
  css: [
    '~/assets/css/main.css'
  ],
  
  // App Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Soze Taleem - Educational Content Platform',
      meta: [
        { name: 'description', content: 'Discover educational content that challenges, inspires, and transforms thinking. Continuing the legacy of meaningful learning.' },
        { name: 'theme-color', content: '#000000' },
        { name: 'msapplication-TileColor', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' }
      ]
    }
  },
  
  // Icon Configuration
  icon: {
    size: '24px',
    class: 'icon'
  },
  
  // Image Configuration
  image: {
    quality: 85,
    format: ['webp', 'png', 'jpg']
  },
  
  // Runtime Configuration
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8888/api'
    }
  },
  
  // Nitro Configuration for API proxy
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8888/api',
        changeOrigin: true,
        prependPath: true
      }
    },
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})