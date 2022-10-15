import { ColorTheme, LocalStorageKey } from '@/typings';
import { useStorage } from '@vueuse/core';
import { watch } from 'vue';

let theme = $(useStorage(LocalStorageKey.theme, ColorTheme.light));

export function useTheme() {
  watch(
    () => theme,
    () => {
      document.documentElement.dataset.theme = theme;
    },
    {
      immediate: true,
    },
  );

  function toggle(nextTheme?: ColorTheme) {
    if (nextTheme) {
      theme = nextTheme;
      return;
    }

    if (theme === ColorTheme.light) {
      theme = ColorTheme.dark;
    } else {
      theme = ColorTheme.light;
    }
  }

  return $$({
    theme,
    toggle,
  });
}
