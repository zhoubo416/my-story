// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/ui', '@nuxt/fonts', '@nuxt/image', 'nuxt-file-storage', 'dayjs-nuxt'],
  ui: {
    icons: ['heroicons', 'simple-icons', 'mi']
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
