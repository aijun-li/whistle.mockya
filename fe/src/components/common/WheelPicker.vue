<template>
  <div class="picker">
    <div class="picker-list-wrapper">
      <ul class="picker-list">
        <li v-for="n in numbers" :key="n" class="picker-item">
          {{ n }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
}
interface Emits {
  (e: 'update:modelValue', n: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 60,
});
const emit = defineEmits<Emits>();

let innerValue = $ref(props.modelValue);
watch(
  () => props.modelValue,
  (val) => {
    innerValue = val;
  },
);

const numbers = $computed(() => getVisibleNumbers(props.min, props.max, innerValue));

function getVisibleNumbers(min: number, max: number, n: number) {
  const totalCount = max - min + 1;
  const maxRenderCount = Math.min(30, totalCount);
  const halfRenderCount = Math.floor(maxRenderCount / 2);
  const set = new Set();

  for (let i = n - halfRenderCount; i <= n + halfRenderCount; i++) {
    const nn = i < min ? max + i - min : i > max ? min + i - max : i;
    set.add(nn);
  }

  return [...set];
}
</script>

<style lang="scss" scoped>
.picker {
  @apply w-full relative flex items-center justify-center overflow-auto overscroll-none;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    @apply hidden;
  }
  &:focus {
    @apply outline-none;
  }

  .picker-list {
    @apply relative h-full w-full flex-1 overflow-hidden flex items-center justify-center;

    .picker-item {
      @apply px-2;
    }
  }
}
</style>
