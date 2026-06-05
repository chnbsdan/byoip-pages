import { readFileSync } from 'fs'
import { join } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

const servicesConfig = JSON.parse(readFileSync(join(process.cwd(), 'app/assets/config/services.json'), 'utf-8'))
const partnersConfig = JSON.parse(readFileSync(join(process.cwd(), 'app/assets/config/partners.json'), 'utf-8'))
const sponsorsConfig = JSON.parse(readFileSync(join(process.cwd(), 'app/assets/config/sponsors.json'), 'utf-8'))
const cdnConfig = JSON.parse(readFileSync(join(process.cwd(), 'app/assets/config/cdn.json'), 'utf-8'))
const butterpopConfig = JSON.parse(readFileSync(join(process.cwd(), 'app/assets/config/butterpop.json'), 'utf-8'))

const embeddedConfig = {
  services: servicesConfig || { services: [] },
  partners: partnersConfig || { partners: [] },
  sponsors: sponsorsConfig || { sponsors: [] },
  cdn: cdnConfig,
  butterpop: butterpopConfig,
  performance: {
    optimization: {
      preload: { enabled: true, routes: [], resources: [] },
      lazyLoading: { enabled: true, threshold: '100px', components: [] },
      caching: {
        staticAssets: { maxAge: 31536000, immutable: true },
        apiResponses: { maxAge: 300, staleWhileRevalidate: 86400 },
        fonts: { maxAge: 31536000, crossOrigin: 'anonymous' }
      },
      compression: { enabled: true, algorithms: ['gzip'], threshold: 1024 }
    },
    monitoring: {
      coreWebVitals: {
        enabled: true,
        thresholds: { fcp: 1800, lcp: 2500, cls: 0.1, fid: 100 }
      },
      resourceTiming: { enabled: true, slowResourceThreshold: 1000 },
      longTasks: { enabled: true, threshold: 50 }
    },
    compatibility: {
      polyfills: {
        intersectionObserver: true,
        fetch: true,
        customProperties: true
      },
      fallbacks: {
        webp: 'jpg',
        avif: 'webp'
      }
    }
  }
}

 

export default defineNuxtConfig({
  compatibilityDate: '2025-09-19',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  ssr: true,

  css: ['./app/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // 应用配置
  app: {
    pageTransition: { name: 'page', mode: 'default' },
    head: {
      title: 'NB 优选服务 - CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' },
        { name: 'keywords', content: 'CDN, IP优选, CloudFlare, Vercel, Netlify, 网络加速, 节点监测' },
        { name: 'author', content: '© MIFENG' },
        { property: 'og:title', content: '© NB 优选服务 - CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' },
        { property: 'og:description', content: 'CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '© NB 优选服务 - CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' },
        { name: 'twitter:description', content: 'CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.byoip.top' },
       // { rel: 'preconnect', href: 'https://cdn.jsdmirror.com', crossorigin: 'anonymous' },
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `window.__APP_CONFIG__ = ${JSON.stringify(embeddedConfig)};`
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NB 优选服务 - CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务',
            description: 'CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务',
            applicationCategory: 'NetworkingApplication',
            operatingSystem: 'Web Browser'
          })
        }
      ]
    }
  },

  // 构建配置
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: ['/partners', '/sponsor']
    },
    publicAssets: [
      {
        baseURL: '/icon',
        dir: 'public/icon'
      },
      {
        baseURL: '/',
        dir: 'public',
        maxAge: 31536000
      }
    ]
  },

  // 构建优化
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      assetsDir: 'assets'
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico'],
    server: {
      fs: {
        allow: ['..']
      }
    }
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      appConfig: embeddedConfig
    }
  }
})
