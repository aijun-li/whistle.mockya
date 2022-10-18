<template>
  <div :class="['divider', !vertical ? 'divider-vertical' : 'divider-horizontal']">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  vertical?: boolean;
}

withDefaults(defineProps<Props>(), {
  vertical: false,
});
</script>
