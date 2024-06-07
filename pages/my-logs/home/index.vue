<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()?.currentRoute?.value
const userId = router.query?.user_id
const { data } = await useFetch('/api/user-logs', { query: { userId: userId } })
const userInfo = ref(data.value.data.user)
const logs = ref(data.value.data.logs.map(it => ({ ...it, date: dayjs(it.create_date) })))

const toast = useToast()
const isOpen = ref(false)
const validateLoading = ref(false)
const editAble = ref(false)
const password = ref('')
const goEdit = () => {
  password.value = ''
  isOpen.value = true
}
const validatePassword = async () => {
  validateLoading.value = true
  const { data } = await useFetch('/api/user-editAble', { query: { userId: userId, password: password.value } })
  if (data.value.data) {
    // navigateTo({ path: '/my-logs/edit-home', params: { userId: userId, password: password.value } })
    editAble.value = true
  } else {
    editAble.value = false
    toast.add({ title: '密码错误', color: 'red' })
  }
  editAble.value = true // TODO
  isOpen.value = false
  validateLoading.value = false
}

/**
 * 上传图片
 */
const isOpen2 = ref(false)
const goUploadAvatar = () => {
  isOpen2.value = true
}
/**
 * 日期格式化
 */
const formatDate = (v) => {
  console.log(v, 'formate')
  try {
    return dayjs(v).format('d MMM, YYYY')
  } catch (error) {
    return dayjs().format('d MMM, YYYY')
  }
}

/**
 * 保存数据
 */
const saveLoading = ref(false)
const saveLog = async () => {
  try {
    const data = { userInfo: userInfo.value, logs: logs.value, password: password.value }
    saveLoading.value = true
    const { data: ret } = await useFetch('/api/user-info', {
      method: 'POST',
      body: data
    })
    if (ret.value.success) {
      toast.add({ title: '保存成功' })
    } else {
      toast.add({ title: '保存失败', color: 'red' })
    }
  } catch (error) {
    console.error(error)
    toast.add({ title: '保存失败', color: 'red' })
  }
  saveLoading.value = false
}

const log = {
  title: '',
  description: '',
  date: ref(new Date())
}
const addDefaultLog = () => {
  logs.value.push({ ...log })
}
</script>

<template>
  <ULandingSection>
    <div>
      <UPageHeader
        headline="个人主页"
        :title="userInfo.name"
        :description="userInfo.description"
      >
        <template
          v-if="editAble"
          #description
        >
          <UTextarea
            v-model="userInfo.description"
            class="w-1/2"
            autoresize
            :row="3"
            resize
            placeholder="介绍一下自己..."
            maxlength="1024"
          />
        </template>
        <template
          v-if="editAble"
          #title
        >
          <UInput
            v-model="userInfo.name"
            placeholder="我的名字..."
            maxlength="128"
          />
        </template>
        <template #icon>
          <template v-if="editAble">
            <div
              @click="goUploadAvatar"
            >
              <UAvatar
                :src="userInfo.avatar || '/images/star.jpg'"
                alt="Avatar"
              />
              <UIcon
                class="text-xs text-primary"
                name="i-heroicons-pencil-square"
              />
            </div>
            <UModal v-model="isOpen2">
              <div class="p-4">
                <upload-file
                  v-model="userInfo.avatar"
                  v-model:isOpen="isOpen2"
                />
              </div>
            </UModal>
          </template>
          <UAvatar
            v-else
            :src="userInfo.avatar || '/images/star.jpg'"
            alt="Avatar"
          />
        </template>
      </UPageHeader>
      <UBlogPost
        v-for="(item, idx) in logs"
        :key="`${item.id}-${idx}`"
        class="mt-6"
        :title="item.title"
        :description="item.description"
        :date="formatDate(item.date)"
        orientation="vertical"
      >
        <template
          v-if="editAble"
          #title
        >
          <UInput
            v-model="item.title"
            class="w-1/4"
            placeholder="标题"
            maxlength="128"
          />
        </template>
        <template
          v-if="editAble"
          #description
        >
          <UTextarea
            v-model="item.description"
            autoresize
            maxlength="10240"
            resize
            :rows="8"
            placeholder="内容..."
          />
        </template>
        <template
          v-if="editAble"
          #date
        >
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
        icon="i-heroicons-plus-circle-16-solid"
        size="xl"
        color="primary"
        variant="link"
        :trailing="false"
        @click="addDefaultLog"
      >
        增加一条
      </UButton>
      <div class="fixed top-24 right-10">
        <UButton
          v-if="editAble"
          icon="i-heroicons-calendar-days-20-solid"
          color="primary"
          :label="'保存'"
          :loading="saveLoading"
          @click="saveLog"
        />
        <UButton
          v-else
          icon="i-heroicons-calendar-days-20-solid"
          color="primary"
          :label="'编辑'"
          :loading="saveLoading"
          @click="goEdit"
        />
      </div>
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
            maxlength="2048"
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
