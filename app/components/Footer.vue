<template>
  <footer class="h-14 bg-gray-50 text-gray-950 border-t border-gray-200 py-3 md:py-4 transition-all duration-300 fixed bottom-0 left-0 right-0 z-10 bg-opacity-90 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <!-- 版权信息 -->
        <span class="text-sm md:text-base">
          Copyright &copy; {{ currentYear }} NB 优选服务
        </span>
        <nav>
          <span class="flex items-center gap-2 leading-tight">
            Powered By <a href="https://nuxt.com" class="text-blue-600"> <img :src="nuxtIcon" alt="Nuxt" class="w-auto h-4" /></a>
            
            &nbsp;
            <a href="https://github.com/chnbsdan/byoip-pages"><img :src="githubIcon" alt="GitHub" class="w-auto h-7 inline-block"/></a>
          </span>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

import nuxtIcon from '~/assets/icons/nuxt.svg'
import githubIcon from '~/assets/icons/github.svg'


const footerLinks = [

  { label: '首页', href: '/' },
  { label: '合作伙伴', href: '/partners' },
  { label: '赞助商', href: '/sponsor' },
  { label: '关于我们', href: '/about' },
  { label: '隐私政策', href: '/privacy' },
]
</script>
