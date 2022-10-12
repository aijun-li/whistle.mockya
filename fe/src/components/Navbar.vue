<template>
  <nav class="w-fit h-screen flex flex-col justify-between bg-base-200">
    <Menu>
      <MenuItem icon><Add /></MenuItem>
      <MenuItem icon><SaveOne /></MenuItem>
      <MenuItem icon><Lightning /></MenuItem>
    </Menu>
    <Menu>
      <MenuItem :tip="theme === ColorTheme.dark ? '切换亮主题' : '切换暗主题'" icon @click="toggleTheme()">
        <ThemeToggle trigger="manual" />
      </MenuItem>
      <MenuItem icon><Setting /></MenuItem>
    </Menu>
  </nav>
</template>

<script lang="ts" setup>
import { useTheme } from '@/hooks';
import { ColorTheme } from '@/typings';
import { Add, Lightning, SaveOne, Setting } from '@icon-park/vue-next';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';
import ThemeToggle from './ThemeToggle.vue';

const { theme, toggle: toggleTheme } = useTheme();
</script>
