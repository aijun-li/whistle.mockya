<template>
  <Swap :active="active" rotate @on-click="changeTheme" @off-click="changeTheme">
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
import { ColorThemeType } from '@/typings';
import { Moon, SunOne } from '@icon-park/vue-next';

interface Props {
  trigger?: 'click' | 'manual';
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'click',
});

let { themeType, toggle } = $(useTheme());
const active = $computed(() => themeType === ColorThemeType.dark);

function changeTheme() {
  if (props.trigger === 'manual') {
    return;
  }
  toggle();
}
</script>
