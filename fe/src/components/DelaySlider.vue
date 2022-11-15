<template>
  <div class="number-slider relative overflow-hidden w-full h-6 -mx-1px px-1px">
    <div class="w-2/1 relative h-full">
      <template v-for="item in tickList" :key="item.n">
        <span :class="['tick', { sub: item.sub }]" :style="{ left: item.x }" />
      </template>
    </div>
    <div class="h-6 absolute left-1/2 transform -translate-x-1/2 w-1px bg-primary z-1 top-0 h-full"></div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  density?: number;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 60,
  density: 5,
});
const emit = defineEmits(['update:modelValue']);

const count = $computed(() => props.max - props.min + 1);

function isSubTick(num: number) {
  return (num - props.min) % props.density !== 0;
}

const tickList = $computed(() =>
  Array(count)
    .fill(() => 0)
    .map((_, index) => ({
      x: calcDistancePercent(props.min + index),
      n: props.min + index,
      sub: isSubTick(props.min + index),
    })),
);

function calcDistancePercent(num: number) {
  return `${(100 / count) * (num - props.min)}%`;
}
</script>

<style lang="scss" scoped>
.tick {
  @apply inline-block w-2px h-4 bg-base-content absolute bottom-0;
  transform: translateX(-50%);

  &.sub {
    @apply h-2;
  }
}
</style>
