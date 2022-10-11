import { ColorTheme, LocalStorageKey } from '@/typings';
import { useStorage } from '@vueuse/core';
import { watch } from 'vue';

export function useTheme() {
  const theme = $(useStorage(LocalStorageKey.theme, ColorTheme.light));

  watch(
    () => theme,
    () => {
      document.documentElement.dataset.theme = theme;
    },
    {
      immediate: true,
    },
  );

  return $$(theme);
}
