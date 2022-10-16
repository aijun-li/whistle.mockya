<template>
  <div :class="['modal', { 'modal-open': modelValue }]">
    <div class="modal-box rounded-box" :style="{ width }">
      <h3 v-if="title" className="font-bold text-lg">{{ title }}</h3>
      <slot />
      <div v-if="slots.action" class="modal-action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  width?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
  width: '',
});
const emit = defineEmits(['update:modelValue']);

const slots = useSlots();
</script>
