<template>
  <div class="flex">
    <Sidebar class="flex-none" />
    <div class="flex-1">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>
