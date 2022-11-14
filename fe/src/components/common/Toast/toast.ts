import { useZIndex } from '@/hooks/zIndex';
import { Color } from '@/typings/component';
import { createVNode, render, VNode } from 'vue';
import Toast from './toast.vue';

interface ToastOptions {
  id?: number;
  type?: Color;
  duration?: number;
  offset?: number;
  zIndex?: number;
  onClose?: () => void;
  onDestroy?: () => void;
  text?: string;
}

export type ToastMethod = {
  (options: ToastOptions): () => void;
};

export interface Toast extends ToastMethod {
  info: (text: string, options?: ToastOptions) => () => void;
  success: (text: string, options?: ToastOptions) => () => void;
  warning: (text: string, options?: ToastOptions) => () => void;
  error: (text: string, options?: ToastOptions) => () => void;
}

const instances: VNode[] = [];
let seed = 0;

const gap = 0;

const { nextZIndex } = useZIndex();

const toast = (options: ToastOptions | string) => {
  const appendTo = document.body;

  const container = document.createElement('div');
  container.className = 'toast-container';

  if (typeof options === 'string') {
    options = { text: options };
  }
  const currentSeed = seed++;
  const props: ToastOptions = {
    id: currentSeed,
    zIndex: nextZIndex(),
    onClose: () => {
      close(currentSeed);
    },
    onDestroy: () => {
      render(null, container);
      container.remove();
    },
    ...options,
  };

  let verticalOffset = options.offset || 8;
  instances.forEach((vInstance) => {
    verticalOffset += (vInstance.el?.offsetHeight || 0) + gap;
  });

  props.offset = verticalOffset;

  const vm = createVNode(Toast, props as any);

  instances.push(vm);

  render(vm, container);

  appendTo.appendChild(container);

  return () => close(currentSeed);
};

export const close = (vmId: number) => {
  const idx = instances.findIndex((vm) => vm.component!.props!.id === vmId);

  if (idx === -1) {
    return;
  }

  const vm = instances[idx];
  const removedHeight = vm.el!.offsetHeight;

  instances.splice(idx, 1);

  const len = instances.length;
  if (len === 0 || idx >= len) {
    return;
  }

  for (let i = idx; i < len; i++) {
    const newOffset = parseInt(instances[i].el!.style.top, 10) - removedHeight - gap;
    instances[i].component!.props.offset = newOffset;
  }
};

['info', 'success', 'warning', 'error'].forEach((type) => {
  Object.assign(toast, {
    [type]: (text: string, options: ToastOptions = {}) => {
      toast({
        text,
        type: type as Color,
        ...options,
      });
    },
  });
});

export default toast as Toast;
