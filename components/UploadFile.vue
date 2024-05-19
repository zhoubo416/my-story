<template>
  <div class="container">
    <div
      v-if="!!fileObj"
      class="images"
    >
      <img
        v-for="file in files"
        :key="file.name"
        :src="file.content"
        :alt="file.name"
      >
    </div>
    <div class="input-container">
      <div class="links">
        <a
          v-for="link in fileLinks"
          :key="link"
          :href="`/userFiles/specificFolder/${link}`"
        >{{ link }}</a>
      </div>
      <label
        id="dropcontainer"
        for="images"
        class="drop-container"
        @dragover.prevent
        @dragenter.prevent="(e: any) => { e.target.classList.add('drag-active') }"
        @dragleave.prevent="(e: any) => { e.target.classList.remove('drag-active') }"
        @drop.prevent="handleDrop"
      >
        <input
          id="file-input"
          :ref="fileInput"
          type="file"
          accept=".jpg, .jpeg, .png"
          name="files[]"
          @input="handleFileInput"
          @change="onFileChange"
        >
      </label>

      <UIcon
        class="icon"
        name="i-heroicons-arrow-up-circle-16-solid"
        @click="submit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const emit = defineEmits(['update:modelValue'])
const { handleFileInput, files } = useFileStorage()

const fileInput = ref<HTMLInputElement>()
const fileObj = ref<File | null>(null)

const maxFileSize = 2 * 1024 * 500 // 500k
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    if (target.files[0]?.size > maxFileSize) {
      toast.info('文件大小不能超过500k')
      return
    }
    fileObj.value = target.files[0]
  }
}
const handleDrop = (e: any) => {
  alert('drag and drop functionality does not work currently, you can try to fix it in the repo :)')
}

const fileLinks = ref<string[]>([])

const submit = async () => {
  console.log(handleFileInput, files, 'handleFileInput, files')
  if (!files.value?.length) {
    toast.info('请先选择一个文件')
    return
  }

  const formData = new FormData()
  formData.append('file', fileObj.value)
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

<style scoped>
pre {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

img.logo {
  width: 5em;
  animation: animate-in 0.5s alternate infinite;
}

.container {
  display: flex;
  flex-direction:column;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 1em;
}

.images {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap:1em;
  padding: 1em;
}

/* Track */
::-webkit-scrollbar-track {
  background-color:rgb(var(--color-primary-600));
}

/* Thumb */
::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-primary-DEFAULT));
  border-radius: 10px;
}

/* Thumb hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #ccc;
}

.images img {
  max-height: 15em;
  border-radius: 0.5em;
}

.links {
  display: grid;
  margin-block: 1em;
  gap: 1em;
}

.links a {
  padding: 0.5em 1em;
  background: rgb(var(--color-primary-300));
  border-radius: 0.3em;
  text-decoration: none;
  color: black;
}

header {
  display: flex;
  align-items: center;
  gap: 2em;
}

.drop-container {
  border-radius: 10px;
  border: 2px dashed #555;
  color: #444;
  cursor: pointer;
  transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
  background: #eee;
  border-color: #111;
}

.drop-container:hover .drop-title {
  color: #222;
}

.drop-title {
  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color .2s ease-in-out;
}

input[type=file]::file-selector-button, button {
  margin-right: 20px;
  border: none;
  background: rgb(var(--color-primary-400));
  padding: 10px 10px;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover, button:hover {
  background: rgb(var(--color-primary-DEFAULT));
}

.drop-container.drag-active {
  background: #eee;
  border-color: #111;
}

.drop-container.drag-active .drop-title {
  color: #222;
}

.text {
  font-size: 3em;
}
.icon{
  font-size: xxx-large;
  color: rgb(var(--color-primary-DEFAULT));
}

.nuxt {
  background: linear-gradient(135deg, rgb(var(--color-primary-400)), rgb(var(--color-primary-DEFAULT)), rgb(var(--color-primary-800)));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes animate-in {
  from {
    transform: translateY(5%);
  }

  to {
    transform: translateY(-5%);
  }
}
</style>
