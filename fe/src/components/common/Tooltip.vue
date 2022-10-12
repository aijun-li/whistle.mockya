<template>
  <div :class="[{ tooltip: tip && !disabled }, `tooltip-${type}`, `tooltip-${position}`]" :data-tip="tip">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  tip?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  type?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  tip: '',
  position: 'top',
  type: 'primary',
  disabled: false,
});
</script>
