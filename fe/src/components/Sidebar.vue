<template>
  <div class="w-fit h-screen flex flex-col justify-between bg-base-200 shadow">
    <Menu>
      <MenuItem tip="Home" icon>
        <Home />
      </MenuItem>
      <MenuItem tip="Command Palette" icon>
        <DocSearch />
      </MenuItem>
    </Menu>
    <Menu>
      <MenuItem tip="Toggle Chinese" icon><English /></MenuItem>
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
import { DocSearch, English, Home, Setting } from '@icon-park/vue-next';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';
import ThemeToggle from './ThemeToggle.vue';

const { theme, toggle: toggleTheme } = useTheme();
</script>
