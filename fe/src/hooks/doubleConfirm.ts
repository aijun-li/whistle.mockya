import { readonly } from 'vue';

export function useDoubleConfirm(callback: () => void | Promise<void>, delay = 2000) {
  let preconfirmed = $ref(false);

  function trigger() {
    if (!preconfirmed) {
      preconfirmed = true;
      setTimeout(() => {
        preconfirmed = false;
      }, delay);
    } else {
      callback();
    }
  }

  return {
    preconfirmed: readonly($$(preconfirmed)),
    trigger,
  };
}
