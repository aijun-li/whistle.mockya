<template>
  <div class="indicator">
    <span :class="['indicator-item', 'badge', { [`badge-${color}`]: color }, `badge-${size}`]">
      <slot name="badge" />
    </span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { SemanticColor, Size } from '@/typings/component';

interface Props {
  color?: SemanticColor;
  size?: Size;
}

withDefaults(defineProps<Props>(), {
  color: SemanticColor.default,
  size: Size.md,
});
</script>
