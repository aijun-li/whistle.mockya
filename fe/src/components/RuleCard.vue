<template>
  <div class="relative top-0 hover:-top-2px transition-all duration-200">
    <Card
      class="rule-card !shadow-none transition-all duration-200 hover:border-primary"
      bordered
      compact
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="relative">
        <div class="font-semibold">{{ rule.pattern }}</div>
        <div class="text-xs opacity-70">{{ rule.desc || '&nbsp;' }}</div>

        <Transition name="operation">
          <div v-if="hovered" class="operation-section">
            <Edit class="operation-icon edit-icon" />
            <Delete class="operation-icon delete-icon" />
            <More class="operation-icon more-icon" />
          </div>
        </Transition>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Edit, More } from '@icon-park/vue-next';
import { Rule } from '~/typings';
import Card from './common/Card.vue';

interface Props {
  rule: Rule;
}

const props = defineProps<Props>();

const hovered = $ref(false);
</script>

<style lang="scss" scoped>
.operation-section {
  @apply absolute right-0 top-1/2 transform -translate-y-1/2;

  .operation-icon {
    @apply cursor-pointer;

    &:not(:first-child) {
      @apply ml-4;
    }
  }
}

.operation-enter-active,
.operation-leave-active {
  transition: all 0.2s ease;

  .delete-icon {
    transition-delay: 0.1s;
  }
  .more-icon {
    transition-delay: 0.2s;
  }
}

.operation-enter-from,
.operation-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
