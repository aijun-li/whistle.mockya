<template>
  <div class="settings h-screen prose px-8 flex flex-col">
    <h1 class="flex-none">Settings</h1>

    <ElScrollbar class="flex-1">
      <section>
        <h2 class="sticky top-0">Theme</h2>

        <div class="setting-item">
          <div class="setting-title">Light Theme</div>
          <Select v-model="lightTheme" class="setting-select" bordered>
            <Option v-for="item in LightColorTheme" :key="item" :value="item" :data-theme="item" />
          </Select>
        </div>

        <div class="setting-item">
          <div class="setting-title">Dark Theme</div>
          <Select v-model="darkTheme" class="setting-select" bordered>
            <Option v-for="item in DarkColorTheme" :key="item" :value="item" :data-theme="item" />
          </Select>
        </div>
      </section>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import Option from '@/components/common/Option.vue';
import Select from '@/components/common/Select.vue';
import { DarkColorTheme, LightColorTheme } from '@/const/theme';
import { useThemeStore } from '@/stores';
import { ElScrollbar } from 'element-plus';
import { storeToRefs } from 'pinia';

const { lightTheme, darkTheme } = storeToRefs(useThemeStore());
</script>

<style lang="scss" scoped>
.setting-item {
  @apply py-4 flex items-center;

  .setting-title {
    @apply font-semibold text-lg w-50;
  }

  .setting-select {
    @apply w50;
  }
}
</style>
