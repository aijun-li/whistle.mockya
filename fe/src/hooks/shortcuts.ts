import { Shortcut, UseShortcutOptions } from '@/typings/hook';
import { onKeyDown } from '@vueuse/core';

const platform = navigator.platform.toLowerCase().startsWith('mac') ? 'mac' : 'win';

const shortcutMap = {
  [Shortcut.search]: {
    mac: {
      key: 'f',
      modifiers: ['Meta'],
      tip: '⌘+F',
    },
    win: {
      key: 'f',
      modifiers: ['Control'],
      tip: 'Ctrl+F',
    },
  },
};

export function useShortcut(type: Shortcut, cb: () => void, options: UseShortcutOptions = {}) {
  const config = shortcutMap[type][platform];
  const { preventDefault = true } = options;

  onKeyDown(config.key, (e) => {
    if (config.modifiers.some((modifier) => !e.getModifierState(modifier))) {
      return;
    }

    if (preventDefault) {
      e.preventDefault();
    }

    cb();
  });

  return config.tip;
}
