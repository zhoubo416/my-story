<script setup lang="ts">
const nuxtApp = useNuxtApp()

const links = computed(() => [ {
  label: '首页',
  to: '/',
  icon: 'i-heroicons-credit-card'
}, {
  label: '精彩人生',
  to: '/my-logs',
  icon: 'i-heroicons-academic-cap'
}, {
  label: '关于网站',
  to: '/faq',
  icon: 'i-heroicons-question-mark-circle'
}])

</script>

<template>
  <UHeader :links="links">
    <template #logo>
      繁星
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton
        label="Sign in"
        color="white"
        block
        class="mb-3"
      />
      <UButton
        label="Get started"
        block
      />
    </template>
  </UHeader>
</template>
