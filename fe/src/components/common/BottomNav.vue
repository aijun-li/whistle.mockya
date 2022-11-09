<template>
  <div :class="['btm-nav static', `btm-nav-${size}`]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { Size } from '@/typings/component';
import { provide } from 'vue';

interface Props {
  modelValue: string;
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
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

provide(InjectionKeys.bottomNavActiveName, $$(activeName));
</script>
