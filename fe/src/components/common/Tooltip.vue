<template>
  <div :class="[{ tooltip: tip && !disabled }, `tooltip-${type}`, `tooltip-${position}`]" :data-tip="tip">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { Position, SemanticColor } from '@/typings/component';

interface Props {
  tip?: string;
  position?: Position;
  type?: SemanticColor;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  tip: '',
  position: Position.top,
  type: SemanticColor.primary,
  disabled: false,
});
</script>
