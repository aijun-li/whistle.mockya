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
import { useThemeStore } from '@/stores';
import { ColorThemeType } from '@/typings';
import { Moon, SunOne } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';

interface Props {
  trigger?: 'click' | 'manual';
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'click',
});

const themeStore = useThemeStore();
const { themeType } = $(storeToRefs(themeStore));
const { toggle } = themeStore;

const active = $computed(() => themeType === ColorThemeType.dark);

function changeTheme() {
  if (props.trigger === 'manual') {
    return;
  }
  toggle();
}
</script>
