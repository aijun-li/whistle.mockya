<template>
  <ul
    class="menu"
    :class="{
      'menu-compact': compact,
      'menu-horizontal': horizontal,
      'menu-vertical': vertical && !horizontal,
      'rounded-box': rounded,
    }"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { provide } from 'vue';

interface Props {
  modelValue?: string;
  compact?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  compact: false,
  vertical: true,
  horizontal: false,
  rounded: false,
});
const emit = defineEmits(['update:modelValue']);

const activeName = $computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (value !== props.modelValue) {
      emit('update:modelValue', value);
    }
  },
});

provide(InjectionKeys.menuActiveName, $$(activeName));
</script>
