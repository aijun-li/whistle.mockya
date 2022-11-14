<template>
  <div class="rule-card-wrapper transition duration-200" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <Card class="rule-card relative border-base-300 transition-all duration-200" bordered compact>
      <div>
        <div class="font-semibold">{{ rule.pattern }}</div>
        <div class="text-xs opacity-70">{{ rule.desc || '&nbsp;' }}</div>

        <Transition name="operation" :duration="400">
          <div v-if="hovered" class="absolute right-0 top-0 flex items-center justify-center h-full px-2">
            <div class="operation-btn edit-btn">
              <Button square ghost @click="emit('edit')">
                <Edit />
              </Button>
            </div>
            <div class="operation-btn delete-btn">
              <Button
                :class="{ confirmed: deletePreconfirmed }"
                :color="deletePreconfirmed ? 'error' : ''"
                :ghost="!deletePreconfirmed"
                square
                @click="onDelete"
              >
                <Delete />
              </Button>
            </div>
            <div class="operation-btn more-btn">
              <Button square ghost>
                <More />
              </Button>
            </div>
          </div>
        </Transition>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { useDoubleConfirm } from '@/hooks';
import { Delete, Edit, More } from '@icon-park/vue-next';
import { Rule } from '~/typings';
import Button from './common/Button.vue';
import Card from './common/Card.vue';

interface Props {
  rule: Rule;
}

defineProps<Props>();
const emit = defineEmits(['edit', 'delete']);

const hovered = $ref(false);

const { preconfirmed: deletePreconfirmed, trigger: onDelete } = $(
  useDoubleConfirm(() => {
    emit('delete');
  }),
);
</script>

<style lang="scss" scoped>
.rule-card-wrapper {
  &:not(:last-child):hover {
    @apply -mb-2px;
  }

  &:hover {
    @apply transform -translate-y-2px pb-2px;

    .rule-card {
      @apply shadow-lg border-primary;
    }
  }
}

.rule-card {
  @apply shadow;
  :deep(.card-body) {
    @apply py-2;
  }
}

.operation-btn {
  .button {
    @apply hover:bg-base-300;
  }

  &.delete-btn.confirmed {
    @apply hover:bg-error;
  }
}

.operation-enter-active,
.operation-leave-active {
  .operation-btn {
    transition: all 0.2s ease;
  }
  .delete-btn {
    transition-delay: 0.1s;
  }
  .more-btn {
    transition-delay: 0.2s;
  }
}

.operation-enter-from,
.operation-leave-to {
  .operation-btn {
    opacity: 0;
    transform: translateY(4px);
  }
}
</style>
