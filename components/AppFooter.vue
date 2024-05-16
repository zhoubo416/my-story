<script setup lang="ts">

</script>

<template>
  <UFooter>
   

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <p class="text-gray-500 dark:text-gray-400 text-sm">
        联系作者 zhoubo416@gmail.com
      </p>
    </template>
  </UFooter>
</template>
