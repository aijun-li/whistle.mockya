<template>
  <div ref="container" class="resize-layout flex h-full w-full" :class="{ 'flex-col': vertical }">
    <div ref="startContainer" class="resize-start-container min-w-0 min-h-0 flex-none" :style="startStyle">
      <slot name="start" />
    </div>

    <div
      ref="bar"
      class="resize-bar flex-none bg-base-300 transition-all z-1 border-transparent border-solid bg-clip-padding"
      :class="[
        vertical ? 'cursor-row-resize h-12px -my-5px border-y-5px' : 'cursor-col-resize w-12px -mx-5px border-x-5px',
        mouseHold && '!border-base-300 !border-opacity-60',
      ]"
      un:hover="border-base-300 border-opacity-30"
    ></div>

    <div class="resize-end-container flex-1 min-w-0 min-h-0" :style="endStyle">
      <slot name="end" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementSize, useEventListener } from '@vueuse/core';

interface Props {
  vertical?: boolean;
  localKey?: string;
  startMin?: string;
  endMin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  localKey: '',
  startMin: '',
  endMin: '',
});

const storageKey = $computed(() => `resize-layout-${props.localKey}`);

let startPercent = $ref(props.localKey ? Number(localStorage.getItem(storageKey)) || 50 : 50);

const container = $ref<HTMLDivElement | null>(null);
const startContainer = $ref<HTMLDivElement | null>(null);
const bar = $ref<HTMLDivElement | null>(null);

const { width: containerWidth, height: containerHeight } = $(useElementSize($$(container)));
const containerSize = $computed(() => (props.vertical ? containerHeight : containerWidth));

const startMinConfig = $computed(() => getMinConfig(props.startMin));
const endMinConfig = $computed(() => getMinConfig(props.endMin));

const startStyle = $computed(() => ({
  [props.vertical ? 'height' : 'width']: `${(startPercent * containerSize) / 100}px`,
  minWidth: props.startMin,
}));
const endStyle = $computed(() => ({
  minWidth: props.endMin,
}));

let mouseHold = $ref(false);

useEventListener($$(bar), 'mousedown', () => {
  mouseHold = true;
});
useEventListener(document, 'mouseup', () => {
  mouseHold = false;
  if (props.localKey) {
    localStorage.setItem(storageKey, String(startPercent));
  }
});
useEventListener(document, 'mousemove', (e) => {
  if (!mouseHold) {
    return;
  }

  const { width: fullWidth, height: fullHeight } = container!.getBoundingClientRect();
  const fullSize = props.vertical ? fullHeight : fullWidth;
  const { width: startWidth, height: startHeight } = startContainer!.getBoundingClientRect();
  const startSize = props.vertical ? startHeight : startWidth;
  const diff = props.vertical ? e.movementY : e.movementX;

  const nextStartPixel = Math.min(Math.max(startSize + diff, 0), fullSize);
  const nextStartPercent = (nextStartPixel * 100) / fullSize;
  const nextEndPixel = fullSize - nextStartPixel - 2;
  const nextEndPercent = (nextEndPixel * 100) / fullSize;

  if (
    checkMinSize(nextStartPixel, nextStartPercent, startMinConfig) &&
    checkMinSize(nextEndPixel, nextEndPercent, endMinConfig)
  ) {
    startPercent = nextStartPercent;
  }
});

function getMinConfig(s: string) {
  if (!s || !(s.endsWith('%') || s.endsWith('px'))) {
    return null;
  }

  const unit = s.endsWith('%') ? '%' : 'px';
  const value = Number(s.split(unit)[0]);

  return value
    ? {
        value,
        unit,
      }
    : null;
}
function checkMinSize(pixel: number, percent: number, minConfig: { value: number; unit: string } | null) {
  if (!minConfig) {
    return true;
  }
  const { unit, value } = minConfig;
  return (unit === 'px' && pixel >= value) || (unit === '%' && percent >= value);
}
</script>

<style lang="scss" scoped></style>
