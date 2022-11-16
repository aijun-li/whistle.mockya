<template>
  <div class="picker">
    <div class="picker-list-wrapper">
      <ul class="picker-list">
        <li v-for="n in totalCount" :key="n" class="picker-item">
          {{ min + n - 1 }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

const totalCount = $computed(() => props.max - props.min + 1);
</script>

<style lang="scss" scoped>
.picker {
  @apply w-200px relative flex items-center justify-center overflow-auto overscroll-none;
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
