import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.SITE_URL || 'https://benteveo.com'
const isProductionDomain = siteUrl.replace(/\/+$/, '') === 'https://benteveo.com'
const indexable = isProductionDomain && process.env.INDEXABLE === 'true'

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Cross-Origin-Resource-Policy': 'same-site'
}

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
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@unhead/schema-org/vue', 'embla-carousel-vue', 'gsap', 'lenis']
    }
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
    url: siteUrl,
    name: 'Benteveo',
    description: 'Agencia de publicidad creativa. Innovación, estrategia y tecnología para tu empresa.',
    defaultLocale: 'es'
  },

  ogImage: {
    enabled: false
  },

  sitemap: {
    exclude: ['/agencia-creativa-light'],
    urls: ['salud', 'educacion', 'agroindustria', 'fitness', 'fintech']
      .map(nombre => ({ loc: `/transformacion-tecnologica/${nombre}` }))
  },

  robots: {
    enabled: true,
    ...(indexable
      ? {
          groups: [
            { userAgent: ['*'], allow: ['/'] },
            { userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended'], allow: ['/'] },
            { userAgent: ['CCBot', 'Bytespider'], disallow: ['/'] }
          ]
        }
      : { disallow: ['/'] })
  },

  image: {
    format: ['avif'],
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
    '/**': { headers: securityHeaders },
    '/': { prerender: true },
    '/transformacion-tecnologica': { prerender: true },
    '/transformacion-tecnologica/**': { swr: 86400 },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/img/**': { headers: { 'cache-control': 'public, max-age=86400' } },
    '/video/**': { headers: { 'cache-control': 'public, max-age=86400' } }
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    minify: true
  }
})
