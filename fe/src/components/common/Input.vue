<template>
  <input
    type="text"
    :class="['input', 'input-bordered', `input-${size}`, { [`input-${color}`]: color }]"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
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
</script>
