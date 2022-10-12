<template>
  <div class="indicator">
    <span :class="['indicator-item', 'badge', `badge-${type}`, `badge-${size}`]">
      <slot name="badge" />
    </span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { SemanticColor, Size } from '@/typings/component';

interface Props {
  type?: SemanticColor;
  size?: Size;
}

withDefaults(defineProps<Props>(), {
  type: SemanticColor.primary,
  size: Size.md,
});
</script>
