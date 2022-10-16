<template>
  <div :class="[{ tooltip: tip && !disabled }, { [`tooltip-${color}`]: color }, `tooltip-${position}`]" :data-tip="tip">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { Color, Position } from '@/typings/component';

interface Props {
  tip?: string;
  position?: Position;
  color?: Color;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  tip: '',
  position: 'top',
  color: '',
  disabled: false,
});
</script>

<style lang="scss">
.tooltip {
  &::before,
  &::after {
    @apply z-1;
  }
}
</style>
