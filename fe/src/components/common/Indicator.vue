<template>
  <div class="indicator">
    <span :class="['indicator-item', 'badge', { [`badge-${color}`]: color }, `badge-${size}`]">
      <slot name="badge" />
    </span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
  color?: Color;
  size?: Size;
}

withDefaults(defineProps<Props>(), {
  color: '',
  size: 'md',
});
</script>
