import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo'
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#131313' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  site: {
    url: process.env.SITE_URL || 'https://benteveo.com',
    name: 'Benteveo',
    description: 'Agencia de publicidad creativa. Innovación, estrategia y tecnología para tu empresa.',
    defaultLocale: 'es'
  },

  ogImage: {
    enabled: false
  },

  robots: {
    enabled: true,
    ...(process.env.INDEXABLE === 'true'
      ? {}
      : { disallow: ['/'] })
  },

  image: {
    format: ['avif', 'webp'],
    quality: 70,
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 480,
      tab: 600,
      md: 768,
      lg: 1080,
      xl: 1280,
      xxl: 1440
    }
  },

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
        display: 'swap',
        preload: true
      }
    ],
    defaults: {
      preload: true,
      fallbacks: {
        'sans-serif': ['system-ui', '-apple-system', 'Segoe UI', 'Arial']
      }
    }
  },

  icon: {
    serverBundle: {
      collections: ['material-symbols']
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/transformacion-tecnologica': { prerender: true },
    '/rubros/**': { swr: 86400 },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    minify: true
  }
})
