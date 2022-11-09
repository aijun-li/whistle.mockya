<template>
  <button :class="{ active }" :disabled="disabled" @click="activeName = name">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { inject } from 'vue';

interface Props {
  name: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const activeName = $(inject(InjectionKeys.bottomNavActiveName)!);
const active = $computed(() => activeName === props.name);
</script>
