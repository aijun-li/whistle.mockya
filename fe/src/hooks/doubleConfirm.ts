import { whenever } from '@vueuse/core';

export function useDoubleConfirm(delay = 2000) {
  let confirmed = $ref(false);

  let timer: number;
  whenever(
    () => confirmed,
    () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        confirmed = false;
      }, delay);
    },
  );

  return $$(confirmed);
}
