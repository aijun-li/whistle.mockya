<template>
  <select
    :value="modelValue"
    :class="[
      'select',
      `select-${size}`,
      {
        'select-bordered': bordered,
        'select-ghost': ghost,
        [`select-${color}`]: color,
      },
    ]"
    @change="onChange"
  >
    <slot />
  </select>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { Color, Size } from '@/typings/component';
import { provide, toRef } from 'vue';

interface Props {
  modelValue: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: Color;
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  ghost: false,
  color: '',
  size: 'sm',
});
const emit = defineEmits(['update:modelValue']);

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value);
}

provide(InjectionKeys.selectValue, toRef(props, 'modelValue'));
</script>
