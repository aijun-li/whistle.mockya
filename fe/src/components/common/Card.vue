<template>
  <div :class="['card', 'bg-base-100', 'shadow-xl', { 'card-compact': compact }, { 'card-bordered': bordered }]">
    <div class="card-body">
      <h2 v-if="title" class="card-title">{{ title }}</h2>
      <slot />

      <div v-if="slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

interface Props {
  title?: string;
  compact?: boolean;
  bordered?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: '',
  compact: false,
  bordered: false,
});

const slots = useSlots();
</script>
