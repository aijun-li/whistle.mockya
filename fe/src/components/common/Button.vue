<template>
  <button
    :class="[
      'btn',
      { [`btn-${color}`]: color },
      `btn-${size}`,
      {
        'btn-disabled': disabled,
        'loading': loading,
        'btn-link': link,
        'btn-outline': outline,
        'btn-square': square,
        'btn-circle': circle,
        'btn-ghost': ghost,
        'btn-active': active || groupActivated,
      },
    ]"
    :style="!uppercase ? { '--btn-text-case': 'none' } : undefined"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { Color, Size } from '@/typings/component';
import { inject } from 'vue';

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
  uppercase?: boolean;
  active?: boolean;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  size: 'sm',
  outline: false,
  link: false,
  square: false,
  circle: false,
  ghost: false,
  loading: false,
  disabled: false,
  uppercase: true,
  active: false,
  name: '',
});

const groupActiveName = inject(InjectionKeys.buttonGroupActiveName, '');
const groupActivated = $computed(
  () => props.name && typeof groupActiveName !== 'string' && groupActiveName.value === props.name,
);

function onClick() {
  if (props.name && typeof groupActiveName !== 'string') {
    groupActiveName.value = props.name;
  }
}
</script>
