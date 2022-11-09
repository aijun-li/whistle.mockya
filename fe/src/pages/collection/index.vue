<template>
  <ResizeLayout local-key="collection-home" start-min="30%" end-min="30%">
    <template #start>
      <RuleListPanel />
    </template>
    <template #end>
      <Editor />
    </template>
  </ResizeLayout>
</template>

<script lang="ts" setup>
import Editor from '@/components/common/Editor/Editor.vue';
import ResizeLayout from '@/components/common/ResizeLayout.vue';
import RuleListPanel from './RuleListPanel.vue';
</script>
