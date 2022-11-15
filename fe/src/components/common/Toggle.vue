<template>
  <input
    v-model="value"
    type="checkbox"
    :class="['toggle', `toggle-${size}`, { [`toggle-${color}`]: color }]"
    :disabled="disabled"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { Color, Size } from '@/typings/component';

interface Props {
  modelValue: boolean;
  disabled?: boolean;
  size?: Size;
  color?: Color;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'sm',
  color: '',
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = $computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

function onChange(e: Event) {
  emit('change', (e.target as HTMLInputElement).checked);
}
</script>

<style lang="scss" scoped>
.toggle {
  &-success {
    &:focus-visible {
      outline: 2px solid hsl(var(--su));
    }
    &:checked,
    &[checked='true'],
    &[aria-checked='true'] {
      --chkbg: hsl(var(--su));
      @apply border-success;
      @apply border-success border-opacity-10 bg-success text-success-content;
    }
  }
  &-warning {
    &:focus-visible {
      outline: 2px solid hsl(var(--wa));
    }
    &:checked,
    &[checked='true'],
    &[aria-checked='true'] {
      --chkbg: hsl(var(--wa));
      @apply border-warning;
      @apply border-warning border-opacity-10 bg-warning text-warning-content;
    }
  }
  &-info {
    &:focus-visible {
      outline: 2px solid hsl(var(--in));
    }
    &:checked,
    &[checked='true'],
    &[aria-checked='true'] {
      --chkbg: hsl(var(--in));
      @apply border-info;
      @apply border-info border-opacity-10 bg-info text-info-content;
    }
  }
  &-error {
    &:focus-visible {
      outline: 2px solid hsl(var(--er));
    }
    &:checked,
    &[checked='true'],
    &[aria-checked='true'] {
      --chkbg: hsl(var(--er));
      @apply border-error;
      @apply border-error border-opacity-10 bg-error text-error-content;
    }
  }
  &:disabled {
    @apply cursor-not-allowed border-transparent bg-base-content bg-opacity-20;
  }
}
</style>
