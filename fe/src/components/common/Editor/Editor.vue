<template>
  <div ref="containerEl" class="editor-container h-full"></div>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/stores';
import { hslToHex } from '@/utils';
import { useResizeObserver } from '@vueuse/core';
import * as monaco from 'monaco-editor';
import { nextTick, onMounted } from 'vue';
import './editor';

const { onThemeChange } = useThemeStore();

const containerEl = $ref<HTMLDivElement | null>(null);

let editor: monaco.editor.IStandaloneCodeEditor;

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  comments: 'ignore',
  trailingCommas: 'ignore',
});

onMounted(() => {
  updateThemeColor();
  onThemeChange(async () => {
    await nextTick();
    updateThemeColor();
    monaco.editor.setTheme('mockya');
  });

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

function updateThemeColor() {
  monaco.editor.defineTheme('mockya', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': getColor('b1'),
    },
  });
}

function getColor(name: string) {
  if (!containerEl) {
    return '';
  }
  const color = getComputedStyle(containerEl).getPropertyValue(`--${name}`);
  if (!color) {
    return '';
  }
  const hsl = color.split(',').map((s) => Number(s.replace('%', '').trim()));
  const hex = hslToHex(hsl[0], hsl[1], hsl[2]);
  return hex;
}
</script>
