export default defineNuxtPlugin(() => {
  if (import.meta.server) return
  
  const setSystemFonts = () => {
    try {
      // 添加系统字体样式
      const style = document.createElement('style')
      style.textContent = `
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
        }
        code, pre {
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }
      `
      document.head.appendChild(style)
      document.documentElement.classList.add('fonts-loaded')
    } catch (error) {
      console.warn('⚠️ 字体设置失败，使用浏览器默认字体:', error)
      document.documentElement.classList.add('fonts-fallback')
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setSystemFonts)
  } else {
    setSystemFonts()
  }
})
