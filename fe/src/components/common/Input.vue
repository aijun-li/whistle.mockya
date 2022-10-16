<template>
  <input
    ref="inputEl"
    :value="modelValue"
    type="text"
    :class="['input', 'input-bordered', `input-${size}`, { [`input-${color}`]: color }]"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
    @keydown="onKeydown"
  />
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
  modelValue: string;
  placeholder?: string;
  color?: Color;
  size?: Size;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  color: '',
  size: 'sm',
  disabled: false,
});
const emit = defineEmits(['update:modelValue', 'input']);

defineExpose({
  focus,
  blur,
});

const inputEl = $ref<HTMLInputElement | null>(null);

function onInput(event: InputEvent) {
  const text = (event.target as HTMLInputElement).value;
  emit('update:modelValue', text);
  emit('input', text);
}

function onKeydown(e: KeyboardEvent) {
  if (e.code === 'Escape') {
    blur();
  }
}

function focus() {
  inputEl?.focus();
}

function blur() {
  inputEl?.blur();
}
</script>
