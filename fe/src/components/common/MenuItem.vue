<template>
  <Tooltip v-if="tip" :tip="tip" :position="tipPosition">
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
  </Tooltip>
  <li
    v-else
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
import { Position } from '@/typings/component';
import { computed, inject, WritableComputedRef } from 'vue';
import Tooltip from './Tooltip.vue';

interface Props {
  name?: string;
  disabled?: boolean;
  icon?: boolean;
  tipPosition?: Position;
  tip?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  disabled: false,
  icon: false,
  tipPosition: 'right',
  tip: '',
});

const activeName = $(inject(InjectionKeys.menuActiveName) as WritableComputedRef<string>);
const active = computed(() => activeName === props.name);
</script>
