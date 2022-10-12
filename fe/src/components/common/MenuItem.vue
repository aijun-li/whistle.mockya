<template>
  <li
    :class="{
      'bordered': name && active,
      'disabled': disabled,
      'text-2xl': icon,
    }"
    @click="activeName = name"
  >
    <a :class="{ 'p-4': icon }">
      <slot />
    </a>
  </li>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { computed, inject, WritableComputedRef } from 'vue';

interface Props {
  name?: string;
  disabled?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  disabled: false,
  icon: false,
});

const activeName = $(inject(InjectionKeys.menuActiveName) as WritableComputedRef<string>);
const active = computed(() => activeName === props.name);
</script>
