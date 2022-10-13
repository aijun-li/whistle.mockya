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
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: '',
  size: 'sm',
  outline: false,
  link: false,
  loading: false,
  disabled: false,
});
</script>
