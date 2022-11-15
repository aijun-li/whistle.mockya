<template>
  <div
    :class="['badge', `badge-${size}`, { [`badge-${color}`]: color, 'badge-ghost': ghost, 'badge-outline': outline }]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
  color?: Color;
  size?: Size;
  outline?: boolean;
  ghost?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: '',
  size: 'sm',
  outline: false,
  ghost: false,
});
</script>
