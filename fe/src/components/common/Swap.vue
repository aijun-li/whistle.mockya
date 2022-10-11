<template>
  <label class="swap" :class="{ 'swap-active': active, 'swap-rotate': rotate, 'swap-flip': flip }" @click="onClick">
    <div class="swap-on">
      <slot name="on" />
    </div>
    <div class="swap-off">
      <slot name="off" />
    </div>
  </label>
</template>

<script lang="ts" setup>
interface Props {
  active?: boolean;
  rotate?: boolean;
  flip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  rotate: false,
  flip: false,
});
const emit = defineEmits(['on-click', 'off-click']);

function onClick() {
  if (props.active) {
    emit('on-click');
  } else {
    emit('off-click');
  }
}
</script>
