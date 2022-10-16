<template>
  <button
    :class="[
      'btn',
      { [`btn-${color}`]: color },
      `btn-${size}`,
      { 'btn-disabled': disabled },
      { loading: loading },
      { 'btn-link': link },
      { 'btn-outline': outline },
      { 'btn-square': square },
      { 'btn-circle': circle },
      { 'btn-ghost': ghost },
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
  color?: Color;
  size?: Size;
  outline?: boolean;
  link?: boolean;
  square?: boolean;
  circle?: boolean;
  ghost?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: '',
  size: 'sm',
  outline: false,
  link: false,
  square: false,
  circle: false,
  ghost: false,
  loading: false,
  disabled: false,
});
</script>
