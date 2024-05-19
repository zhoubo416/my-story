<template>
  <div>
    <input
      type="file"
      size="sm"
      icon="i-heroicons-photo"
      @change="onFileChange"
    >
    <UButton
      color="primary"
      variant="solid"
      size="2xs"
      @click="uploadAvatar"
    >
      上传头像
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const emit = defineEmits(['update:modelValue'])

const file = ref<File | null>(null)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    file.value = target.files[0]
  }
}

const uploadAvatar = async () => {
  if (!file.value) {
    toast.info('请先选择一个文件')
    return
  }

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const response = await fetch('/api/upload-avatar', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('上传失败')
    }

    const data = await response.json()
    toast.success('上传成功')
    emit('update:modelValue', data.url)
  } catch (error) {
    console.error(error)
    toast.error('上传失败')
  }
}
</script>
