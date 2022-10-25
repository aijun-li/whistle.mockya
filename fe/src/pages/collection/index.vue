<template>
  <ResizeLayout local-key="collection-home">
    <template #start> </template>
    <template #end>
      <Editor />
    </template>
  </ResizeLayout>
</template>

<script lang="ts" setup>
import Editor from '@/components/common/Editor/Editor.vue';
import ResizeLayout from '@/components/common/ResizeLayout.vue';
</script>
