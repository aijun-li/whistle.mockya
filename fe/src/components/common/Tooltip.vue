<template>
  <div :class="[{ tooltip: tip && !disabled }, { [`tooltip-${color}`]: color }, `tooltip-${position}`]" :data-tip="tip">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { Position, SemanticColor } from '@/typings/component';

interface Props {
  tip?: string;
  position?: Position;
  color?: SemanticColor;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  tip: '',
  position: Position.top,
  color: SemanticColor.default,
  disabled: false,
});
</script>
