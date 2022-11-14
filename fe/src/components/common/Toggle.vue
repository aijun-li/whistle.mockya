<template>
  <input
    v-model="value"
    type="checkbox"
    :class="['toggle', `toggle-${size}`, { [`toggle-${color}`]: color }]"
    :disabled="disabled"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
  modelValue: boolean;
  disabled?: boolean;
  size?: Size;
  color?: Color;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'sm',
  color: '',
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = $computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    console.log('set', val);
    emit('update:modelValue', val);
  },
});

function onChange(e: Event) {
  emit('change', (e.target as HTMLInputElement).checked);
}
</script>
