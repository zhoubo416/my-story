<script setup lang="ts">
const { data: page } = await useAsyncData('faq', () => queryContent('/faq').findOne())

</script>

<template>
  <div>

    <ULandingSection>
      <div>
        <ULandingCard class="mt-5" v-for="item in page.faq.items" v-bind="item" />
      </div>
    </ULandingSection>
  </div>
</template>
