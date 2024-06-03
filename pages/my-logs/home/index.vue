<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()?.currentRoute?.value
const userId = router.query?.user_id
const { data } = await useFetch('/api/user-logs', { query: { userId: userId } })
const userInfo = ref(data.value.data.user)
const logs = ref(data.value.data.logs)

const toast = useToast()
const isOpen = ref(false)
const validateLoading = ref(false)
const password = ref('')
const goEdit = () => {
  password.value = ''
  isOpen.value = true
}
const validatePassword = async () => {
  validateLoading.value = true
  const { data } = await useFetch('/api/user-editAble', { query: { userId: userId, password: password.value } })
  if (data.value.data) {
    navigateTo({ path: '/my-logs/edit-home', query: { userId: userId } })
  } else {
    toast.add({ title: '密码错误' })
  }
  isOpen.value = false
  validateLoading.value = false
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
      <UPageCard>
        <template #title>
          <div class="flex items-center justify-between">
            <div>请输入密码</div>
          </div>
        </template>
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
            :loading="validateLoading"
            label="确定"
            @click="validatePassword"
          />
        </div>
      </UPageCard>
    </UModal>
  </ULandingSection>
</template>
