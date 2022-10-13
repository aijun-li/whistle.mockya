<template>
  <div class="dashboard p-4">
    <header class="flex items-center justify-between">
      <div class="text-2xl font-semibold">Dashboard</div>

      <div class="flex items-center">
        <Input placeholder="Search" />
        <Button class="ml-2" color="primary">Create</Button>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
</script>
