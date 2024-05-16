<script setup>
import { ref } from 'vue';
import { format } from 'date-fns';

const log = {
    title: '',
    description: '',
    date: ref(new Date())
}
const hero = ref({
    avatar: null,
    name: '',
    description: '',
    logs: []
})
const addDefaultLog = () => {
    hero.value.logs.push({ ...log })
}
addDefaultLog()
const formatDate = (v) => {
    return format(v, 'd MMM, yyy');
}



const inputFile = function (newFile, oldFile) {
    if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
            //  获得响应状态码
            console.log('status', newFile.xhr.status)
        }
    }
}

const inputFilter = function (newFile, oldFile, prevent) {
    if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
            return prevent()
        }
    }

    // 创建 blob 字段 用于图片预览
    newFile.blob = ''
    let URL = window.URL || window.webkitURL
    if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
    }
}
</script>
<template>
    <ULandingSection>
        <div>
            <UPageHeader headline="个人主页">
                <template #title>
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    <UInput v-model="hero.name" placeholder="你的名字..." />

                </template>
                <template #description>
                    <UTextarea v-model="hero.description" variant="none" autoresize resize placeholder="介绍一下你自己..." />
                </template>
            </UPageHeader>

            <UBlogPost v-for="(item, idx) in hero.logs" :key="idx" class="mt-6" orientation="vertical">
                <template #title>
                    <UInput v-model="item.title" variant="none" placeholder="这件事情..." />
                </template>
                <template #description>
                    <UTextarea v-model="item.description" variant="none" autoresize resize placeholder="这件事情的详细情况..." />
                </template>

                <template #date>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" color="primary" :label="formatDate(item.date)"
                            size="2xs" />

                        <template #panel="{ close }">
                            <DatePicker v-model="item.date" @close="close" />
                        </template>
                    </UPopover>
                </template>
            </UBlogPost>
            <UButton class="fixed bottom-20 right-20" icon="i-heroicons-plus-circle-16-solid" size="xl" color="primary"
                variant="link" :trailing="false" @click="addDefaultLog">增加一条</UButton>
        </div>
    </ULandingSection>
</template>