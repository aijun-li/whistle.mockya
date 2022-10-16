<template>
  <div class="w-fit h-screen flex flex-col justify-between bg-base-200 shadow">
    <Menu>
      <MenuItem tip="Home" icon @click="goHome">
        <Home />
      </MenuItem>
      <MenuItem tip="Command Palette" icon>
        <DocSearch />
      </MenuItem>
    </Menu>
    <Menu>
      <MenuItem :tip="theme === ColorTheme.dark ? 'Toggle Dark' : 'Toggle Light'" icon @click="toggleTheme()">
        <ThemeToggle trigger="manual" />
      </MenuItem>
      <MenuItem tip="Settings" icon>
        <Setting />
      </MenuItem>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@/hooks';
import { ColorTheme } from '@/typings';
import { DocSearch, Home, Setting } from '@icon-park/vue-next';
import { useRouter } from 'vue-router';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';
import ThemeToggle from './ThemeToggle.vue';

const router = useRouter();
const { theme, toggle: toggleTheme } = useTheme();

function goHome() {
  router.push('/');
}
</script>
