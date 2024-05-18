<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div>
    <ULandingSection
      id="hero"
      class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10"
      align="left"
    >
      <ULandingCTA
        v-bind="page.hero"
      />
      <img
        src="https://picsum.photos/640/360"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>

    <ULandingSection
      class="bg-green-50  dark:bg-green-400 dark:bg-opacity-10"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
      :links="page.testimonials.links"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-blue-50 dark:bg-blue-400 dark:bg-opacity-10">
      <ULandingCTA
        v-bind="page.cta"
        :card="false"
      />
    </ULandingSection>
  </div>
</template>
