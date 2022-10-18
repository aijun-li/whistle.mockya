<template>
  <option :value="value" :selected="selected" :disabled="disabled">
    <slot>
      {{ value }}
    </slot>
  </option>
</template>

<script lang="ts" setup>
import InjectionKeys from '@/const/injection';
import { inject } from 'vue';

interface Props {
  value: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const selectedValue = $(inject(InjectionKeys.selectValue)!);

const selected = $computed(() => props.value === selectedValue);
</script>
