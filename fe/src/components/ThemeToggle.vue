<template>
  <Swap
    class="text-3xl"
    :active="active"
    rotate
    @on-click="changeTheme(ColorTheme.light)"
    @off-click="changeTheme(ColorTheme.dark)"
  >
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

let theme = $(useTheme());
const active = $computed(() => theme === ColorTheme.dark);

function changeTheme(nextTheme: ColorTheme) {
  theme = nextTheme;
}
</script>
