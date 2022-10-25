<template>
  <div ref="containerEl" class="editor-container h-full"></div>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import * as monaco from 'monaco-editor';
import { onMounted } from 'vue';
import './editor';

const containerEl = $ref<HTMLDivElement | null>(null);

let editor: monaco.editor.IStandaloneCodeEditor;

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  comments: 'ignore',
  trailingCommas: 'ignore',
});

onMounted(() => {
  editor = monaco.editor.create(containerEl!, {
    value: '{"a":1}',
    language: 'json',
    minimap: {
      enabled: false,
    },
  });
});

useResizeObserver($$(containerEl), () => {
  editor.layout();
});
</script>
