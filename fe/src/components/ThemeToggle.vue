<template>
  <Swap :active="active" rotate @on-click="changeTheme(ColorTheme.light)" @off-click="changeTheme(ColorTheme.dark)">
    <template #on>
      <Moon />
    </template>
    <template #off>
      <SunOne />
    </template>
  </Swap>
</template>

<script lang="ts" setup>
import Swap from '@/components/common/Swap.vue';
import { useTheme } from '@/hooks';
import { ColorTheme } from '@/typings';
import { Moon, SunOne } from '@icon-park/vue-next';

interface Props {
  trigger?: 'click' | 'manual';
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'click',
});

let { theme, toggle } = $(useTheme());
const active = $computed(() => theme === ColorTheme.dark);

function changeTheme(nextTheme: ColorTheme) {
  if (props.trigger === 'manual') {
    return;
  }
  toggle(nextTheme);
}
</script>
