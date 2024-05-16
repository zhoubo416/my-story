<template>
    <ULandingSection>
        <div>
            <UPageHeader headline="个人主页" title="Robin" description="A happy man."
                :links="[{ label: 'edit', color: 'white', to: '/my-logs/edit-home', target: '_blank', icon: 'i-mi-edit-alt' }]" />
            <UBlogPost class="mt-6" title="我十岁的时候"
                description="Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more."
                date="Dec 25, 2023" orientation="vertical" />
                <UBlogPost class="mt-6" title="我上初中的时候"
                description="Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more."
                date="Dec 25, 2023" orientation="vertical" />
                <UBlogPost class="mt-6"
                title="我上初中的时候"
                description="Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more.Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more."
                date="Dec 25, 2023" orientation="vertical">
                <template #default>
                    <div>Dec 25, 2023</div>
                </template>
                <template #date>
                    <div class="text-gray-500 text-sm">Dec 25, 2023</div>
                </template>
            </UBlogPost>
        </div>
    </ULandingSection>
</template>