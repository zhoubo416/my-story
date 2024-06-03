<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()?.currentRoute?.value
const userId = router.query?.user_id
const { data } = await useFetch('/api/user-logs', { query: { userId: userId } })
const userInfo = ref(data.value.data.user)
const logs = ref(data.value.data.logs)

const isOpen = ref(false)
const password = ref('')
const goEdit = () => {
  password.value = ''
  isOpen.value = true
}
const validatePassword = () => {
  console.log(password.value)
  isOpen.value = false
}
</script>

<template>
  <ULandingSection>
    <div>
      <UPageHeader
        headline="个人主页"
        :title="userInfo.name"
        :description="userInfo.description"
        :links="[{ label: 'edit', color: 'white', target: '_blank', icon: 'i-mi-edit-alt', click: goEdit }]"
      >
        <template #icon>
          <UAvatar
            :src="userInfo.avatar || '/images/star.jpg'"
            alt="Avatar"
          />
        </template>
      </UPageHeader>
      <UBlogPost
        v-for="item in logs"
        :key="item.id"
        class="mt-6"
        :title="item.title"
        :description="item.description"
        :date="dayjs(item.create_date).format('DD/MM YYYY')"
        orientation="vertical"
      />
    </div>

    <UModal v-model="isOpen">
      <div class="p-4 flex">
        <UInput
          v-model="password"
          class="w-4/5"
          type="password"
          placeholder="请输入密码"
        />
        <UButton
          color="primary"
          class="ml-4"
          size="xs"
          label="确定"
          @click="validatePassword"
        />
      </div>
    </UModal>
  </ULandingSection>
</template>
