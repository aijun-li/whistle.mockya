<template>
  <div class="w-fit h-screen flex flex-col justify-between bg-base-200">
    <Menu>
      <MenuItem tip="首页" icon>
        <Home />
      </MenuItem>
      <MenuItem tip="命令面板" icon>
        <DocSearch />
      </MenuItem>
    </Menu>
    <Menu>
      <MenuItem :tip="theme === ColorTheme.dark ? '切换亮主题' : '切换暗主题'" icon @click="toggleTheme()">
        <ThemeToggle trigger="manual" />
      </MenuItem>
      <MenuItem tip="设置" icon>
        <Setting />
      </MenuItem>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@/hooks';
import { ColorTheme } from '@/typings';
import { DocSearch, Home, Setting } from '@icon-park/vue-next';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';
import ThemeToggle from './ThemeToggle.vue';

const { theme, toggle: toggleTheme } = useTheme();
</script>
