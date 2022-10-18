import { DarkColorTheme } from '@/const/theme';
import { ColorTheme, ColorThemeType, LocalStorageKey } from '@/typings';
import { useStorage } from '@vueuse/core';
import { watch } from 'vue';

let lightTheme = $(useStorage<ColorTheme>(LocalStorageKey.lightTheme, ColorTheme.light));
let darkTheme = $(useStorage<ColorTheme>(LocalStorageKey.darkTheme, ColorTheme.dark));
let themeType = $(useStorage<ColorThemeType>(LocalStorageKey.themeType, ColorThemeType.light));

export function useTheme() {
  const isLightTheme = $computed(() => themeType === ColorThemeType.light);

  const theme = $computed({
    get() {
      return isLightTheme ? lightTheme : darkTheme;
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
      console.log('change light', lightTheme);
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
    () => themeType,
    () => {
      document.documentElement.dataset.theme = themeType === ColorThemeType.light ? lightTheme : darkTheme;
    },
  );

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
  });
}
