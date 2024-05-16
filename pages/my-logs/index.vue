
<script setup>
const goPersionHome = () => {
    navigateTo('/my-logs/home', {
        external: true,
        open: {
            target: '_blank'
        }
    })
}



</script>

<template>
    <ULandingSection>
        <div>
            <UCard>
                <div class="flex">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    &nbsp;&nbsp;
                    <span class="text-lg">Robin</span>
                    <span class="text-xs">
                        &nbsp;&nbsp;
                        <UIcon name="i-ph-rocket-launch" dynamic /> 2024-12-12 01:01
                    </span>
                </div>
                <UDivider class="mt-3 mb-5" />
                <UContainer>
                    <div>
                        1 wo 来着山东
                    </div>
                    <div>
                        2 Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server
                        components, new composables...
                    </div>
                    <div>
                        3 Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server
                        components, new composables...
                    </div>
                </UContainer>

                <UButton color="primary" variant="link" size="xs">全部>></UButton>
            </UCard>
            <UCard class="mt-5">
                <div class="flex">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    &nbsp;&nbsp;
                    <span class="text-lg">Robin</span>
                    <span class="text-xs">
                        &nbsp;&nbsp;
                        <UIcon name="i-ph-rocket-launch" dynamic /> 2024-12-12 01:01
                    </span>
                </div>
                <UDivider class="mt-3 mb-5" />
                <UContainer>
                    <div>
                        1 wo 来着山东
                    </div>
                    <div>
                        2 Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server
                        components, new composables...
                    </div>
                    <div>
                        3 Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server
                        components, new composables...
                    </div>
                </UContainer>

                <UButton color="primary" variant="link" size="xs" @click="goPersionHome">全部>></UButton>
            </UCard>
        </div>

    </ULandingSection>
</template>