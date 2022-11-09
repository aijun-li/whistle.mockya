<template>
  <div class="w-fit h-screen flex flex-col justify-between bg-base-200 shadow z-1">
    <Menu>
      <MenuItem tip="Home" icon @click="goHome">
        <Home />
      </MenuItem>
      <MenuItem tip="Command Palette" icon>
        <DocSearch />
      </MenuItem>
    </Menu>
    <Menu>
      <MenuItem :tip="themeType === ColorThemeType.dark ? 'Toggle Dark' : 'Toggle Light'" icon @click="toggleTheme()">
        <ThemeToggle trigger="manual" />
      </MenuItem>
      <MenuItem tip="Settings" icon @click="goSettings">
        <Setting />
      </MenuItem>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/stores';
import { ColorThemeType } from '@/typings';
import { DocSearch, Home, Setting } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';
import ThemeToggle from './ThemeToggle.vue';

const router = useRouter();
const themeStore = useThemeStore();
const { themeType } = storeToRefs(themeStore);
const { toggle: toggleTheme } = themeStore;

function goHome() {
  router.push('/');
}

function goSettings() {
  router.push('/settings');
}
</script>
