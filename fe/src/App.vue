<template>
  <div class="flex w-screen h-screen">
    <Sidebar class="flex-none" />
    <div class="flex-1 min-w-0">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>
