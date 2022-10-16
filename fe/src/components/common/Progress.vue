<template>
  <progress class="progress w-56" :class="{ [`progress-${color}`]: color }" :value="value" :max="max" />
</template>

<script lang="ts" setup>
import { Color } from '@/typings/component';

interface Props {
  color?: Color;
  max?: number;
  value?: number;
}

defineProps<Props>();
</script>
