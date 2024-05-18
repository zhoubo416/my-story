<template>
  <div>
    <input
      type="file"
      size="sm"
      icon="i-heroiconsphoto"
      @change="onFileChange"
    />
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
    alert('请先选择一个文件')
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
    alert('上传成功')
    console.log('File URL:', data.url)
    emit('update:modelValue', data.url)
  } catch (error) {
    console.error(error)
    alert('上传失败')
  }
}
</script>
