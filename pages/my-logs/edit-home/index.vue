<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'

const log = {
  title: '',
  description: '',
  date: ref(new Date())
}
const hero = ref({
  avatar: '/images/user.jpg',
  name: '',
  description: '',
  logs: []
})
const addDefaultLog = () => {
  hero.value.logs.push({ ...log })
}
addDefaultLog()
const formatDate = (v) => {
  return format(v, 'd MMM, yyy')
}

const isOpen = ref(false)
const goUploadAvatar = () => {
  isOpen.value = true
}
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/user-info')
    console.log(data, 'data');
  } catch (err) {
    // error.value = 'An error occurred while fetching data.'
  }
})
</script>

<template>
  <ULandingSection>
    <div>
      <UPageHeader headline="个人主页">
        <template #title>
          <div
            @click="goUploadAvatar"
          >
            <UAvatar
              :src="hero.avatar"
              alt="Avatar"
            />
            <UIcon
              class="text-xs text-primary"
              name="i-heroicons-pencil-square"
            />
          </div>
          <UModal v-model="isOpen">
            <div class="p-4">
              <upload-file v-model="hero.avatar" />
            </div>
          </UModal>

          <UInput
            v-model="hero.name"
            placeholder="我的名字..."
          />
        </template>
        <template #description>
          <UTextarea
            v-model="hero.description"
            variant="none"
            autoresize
            resize
            placeholder="我是谁..."
          />
        </template>
      </UPageHeader>

      <UBlogPost
        v-for="(item, idx) in hero.logs"
        :key="idx"
        class="mt-6"
        orientation="vertical"
      >
        <template #title>
          <UInput
            v-model="item.title"
            variant="none"
            placeholder="有件事情..."
          />
        </template>
        <template #description>
          <UTextarea
            v-model="item.description"
            variant="none"
            autoresize
            resize
            placeholder="我想记下..."
          />
        </template>

        <template #date>
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              color="primary"
              :label="formatDate(item.date)"
              size="2xs"
            />

            <template #panel="{ close }">
              <DatePicker
                v-model="item.date"
                @close="close"
              />
            </template>
          </UPopover>
        </template>
      </UBlogPost>
      <UButton
        class="fixed bottom-20 right-20"
        icon="i-heroicons-plus-circle-16-solid"
        size="xl"
        color="primary"
        variant="link"
        :trailing="false"
        @click="addDefaultLog"
      >
        增加一条
      </UButton>
    </div>
  </ULandingSection>
</template>
