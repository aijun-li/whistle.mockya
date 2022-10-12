<template>
  <div class="flex">
    <Navbar class="flex-none" />
    <div class="flex-1">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>
