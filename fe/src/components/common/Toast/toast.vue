<template>
  <Transition name="toast-fade" @before-leave="onClose" @after-leave="onDestroy">
    <div v-show="render" class="toast toast-top toast-center p-2" :style="style">
      <div :class="['alert py-2', { [`alert-${type}`]: type }]">
        <div class="flex items-center">
          <Component :is="Icon" />
          {{ text }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { Color } from '@/typings/component';
import { Attention, CheckOne, CloseOne, Info } from '@icon-park/vue-next';
import { onMounted } from 'vue';

export interface Props {
  id?: number;
  type?: Color;
  duration?: number;
  offset?: number;
  zIndex?: number;
  text: string;
  onDestroy?: () => void;
  onClose?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  type: '',
  duration: 1000,
  offset: 0,
  zIndex: 1,
  onDestroy: () => {
    /**/
  },
  onClose: () => {
    /**/
  },
});

const style = $computed(() => ({
  top: `${props.offset}px`,
}));

const Icon = $computed(() => {
  switch (props.type) {
    case 'success':
      return CheckOne;
    case 'error':
      return CloseOne;
    case 'info':
      return Info;
    case 'warning':
      return Attention;
    default:
      return Info;
  }
});

let render = $ref(false);

onMounted(() => {
  render = true;
  startTimer();
});

function startTimer() {
  setTimeout(() => {
    close();
  }, props.duration);
}

function close() {
  render = false;
}
</script>

<style lang="scss" scoped>
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}

.toast {
  transition: all 200ms ease;
}
</style>
