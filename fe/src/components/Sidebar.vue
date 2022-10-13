<template>
  <div class="w-fit h-screen flex flex-col justify-between bg-base-200">
    <Menu>
      <MenuItem tip="首页" icon><Home /></MenuItem>
      <MenuItem icon><Add /></MenuItem>
      <MenuItem tip="保存 (⌘ + S)" icon>
        <Indicator size="xs" color="warning">
          <SaveOne />
        </Indicator>
      </MenuItem>
      <MenuItem icon><Lightning /></MenuItem>
    </Menu>
    <Menu>
      <MenuItem :tip="theme === ColorTheme.dark ? '切换亮主题' : '切换暗主题'" icon @click="toggleTheme()">
        <ThemeToggle trigger="manual" />
      </MenuItem>
      <MenuItem tip="设置" icon><Setting /></MenuItem>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@/hooks';
import { ColorTheme } from '@/typings';
import { Add, Home, Lightning, SaveOne, Setting } from '@icon-park/vue-next';
import Indicator from './common/Indicator.vue';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';
import ThemeToggle from './ThemeToggle.vue';

const { theme, toggle: toggleTheme } = useTheme();
</script>
