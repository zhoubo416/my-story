<script setup>
import dayjs from 'dayjs'

const goPersonHome = () => {
  navigateTo('/my-logs/home', {
    external: true,
    open: {
      target: '_blank'
    }
  })
}

const { data } = await useFetch('/api/user-info')
console.log(data.value.data)

const userList = ref(data.value.data?.map(it => ({ ...it, dt: dayjs(it.log_update_date || it.log_create_date).format('DD/MM YYYY') })))
</script>

<template>
  <ULandingSection>
    <div>
      <UBlogPost
        v-for="item in userList"
        :key="item.id"
        class="mb-6"
        :title="item.log_title"
        orientation="vertical"
        :authors="[{ name: item.name, avatar: { src: item.avatar || '/images/star.jpg', target: '_blank' } }]"
      >
        <template #date>
          {{ item.dt }}
        </template>
        <template #description>
          {{ item.log_description }}
          <UButton
            color="primary"
            variant="link"
            size="xs"
            @click="goPersonHome"
          >
            全部>>
          </UButton>
        </template>
      </UBlogPost>
    </div>
  </ULandingSection>
</template>
