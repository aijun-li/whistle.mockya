<template>
  <div class="btn-group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { provide } from 'vue';

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
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

provide(InjectionKeys.buttonGroupActiveName, $$(activeName));
</script>
