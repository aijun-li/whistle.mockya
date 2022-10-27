import { DarkColorTheme } from '@/const/theme';
import { ColorTheme, ColorThemeType, LocalStorageKey } from '@/typings';
import { createEventHook, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { watch, watchEffect } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  let lightTheme = $(useStorage<ColorTheme>(LocalStorageKey.lightTheme, ColorTheme.light));
  let darkTheme = $(useStorage<ColorTheme>(LocalStorageKey.darkTheme, ColorTheme.dark));
  let themeType = $(useStorage<ColorThemeType>(LocalStorageKey.themeType, ColorThemeType.light));

  const themeChangeHook = createEventHook<string>();

  const theme = $computed({
    get() {
      return themeType === ColorThemeType.light ? lightTheme : darkTheme;
    },
    set(nextTheme: ColorTheme) {
      if (DarkColorTheme.includes(nextTheme)) {
        themeType = ColorThemeType.dark;
        darkTheme = nextTheme;
      } else {
        themeType = ColorThemeType.light;
        lightTheme = nextTheme;
      }
    },
  });

  watch(
    () => lightTheme,
    () => {
      themeType = ColorThemeType.light;
    },
  );

  watch(
    () => darkTheme,
    () => {
      themeType = ColorThemeType.dark;
    },
  );

  watch(
    () => theme,
    () => {
      themeChangeHook.trigger('theme');
    },
  );

  watchEffect(() => {
    document.documentElement.dataset.theme = themeType === ColorThemeType.light ? lightTheme : darkTheme;
  });

  function toggle(type?: ColorThemeType) {
    if (type) {
      themeType = type;
      return;
    }

    if (themeType === ColorThemeType.light) {
      themeType = ColorThemeType.dark;
    } else {
      themeType = ColorThemeType.light;
    }
  }

  return $$({
    theme,
    themeType,
    lightTheme,
    darkTheme,
    toggle,
    onThemeChange: themeChangeHook.on,
  });
});
