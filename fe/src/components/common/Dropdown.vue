<template>
  <div
    :class="[
      'dropdown',
      { [`dropdown-${position}`]: ['top', 'left', 'right'].includes(position) },
      { 'dropdown-hover': trigger === 'hover' },
      { 'dropdown-end': end },
    ]"
  >
    <label tabindex="0">
      <slot name="reference" />
    </label>
    <div class="dropdown-content shadow bg-base-100 rounded-box" tabindex="0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Position } from '@/typings/component';

interface Props {
  position?: Position;
  trigger?: 'hover' | 'click';
  end?: boolean;
}

withDefaults(defineProps<Props>(), {
  position: 'bottom',
  trigger: 'click',
  end: false,
});
</script>
