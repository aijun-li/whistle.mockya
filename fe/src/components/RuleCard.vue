<template>
  <div class="relative top-0 hover:-top-1 transition-all duration-200">
    <Card
      class="rule-card relative border-base-300 !shadow-none transition-all duration-200 hover:border-primary"
      bordered
      compact
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div>
        <div class="font-semibold">{{ rule.pattern }}</div>
        <div class="text-xs opacity-70">{{ rule.desc || '&nbsp;' }}</div>

        <Transition name="operation" :duration="400">
          <div v-if="hovered" class="absolute right-0 top-0 flex items-center justify-center h-full px-1">
            <div class="operation-btn edit-btn">
              <Button square ghost>
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
import { deleteRule } from '@/services';
import { handleError, toast } from '@/utils';
import { Delete, Edit, More } from '@icon-park/vue-next';
import { Rule } from '~/typings';
import Button from './common/Button.vue';
import Card from './common/Card.vue';

interface Props {
  rule: Rule;
}

const props = defineProps<Props>();
const emit = defineEmits(['refetch']);

const hovered = $ref(false);

const { preconfirmed: deletePreconfirmed, trigger: onDelete } = $(
  useDoubleConfirm(async () => {
    try {
      await deleteRule(props.rule);
      toast.success('Deleted');
      emit('refetch');
    } catch (error) {
      handleError(error);
    }
  }),
);
</script>

<style lang="scss" scoped>
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
