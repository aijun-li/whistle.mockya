<template>
  <div class="rule-card-wrapper transition duration-200" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <Card
      class="rule-card relative border-base-300 transition-all duration-200"
      :class="{ 'opacity-60': !rule.enabled && !hovered, 'just-on': justTurnedOn, 'just-off': justTurnedOff }"
      bordered
      compact
    >
      <div class="flex items-center">
        <Transition>
          <Badge v-if="!hovered" class="absolute" :color="rule.enabled ? 'success' : ''" size="xs" />
          <Toggle
            v-else
            class="absolute"
            :model-value="rule.enabled"
            color="success"
            @update:model-value="onRuleToggle"
          />
        </Transition>

        <div class="ml-5" :style="{ transform: `translateX(${titleTranslate.x}px)` }">
          <div class="font-semibold">{{ rule.pattern }}</div>
          <div class="text-xs opacity-60">{{ rule.desc || 'No Description' }}</div>
        </div>
      </div>

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
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { useDoubleConfirm } from '@/hooks';
import { Delete, Edit, More } from '@icon-park/vue-next';
import { useSpring } from '@vueuse/motion';
import { reactive, watch } from 'vue';
import { Rule } from '~/typings';
import Badge from './common/Badge.vue';
import Button from './common/Button.vue';
import Card from './common/Card.vue';
import Toggle from './common/Toggle.vue';

interface Props {
  rule: Rule;
}

const props = defineProps<Props>();
const emit = defineEmits(['edit', 'delete', 'toggle']);

let hovered = $ref(false);

const { preconfirmed: deletePreconfirmed, trigger: onDelete } = $(
  useDoubleConfirm(() => {
    emit('delete');
  }),
);

const titleTranslate = reactive({ x: 0 });
const { set: setTitleTranslate } = useSpring(titleTranslate, { stiffness: 210, damping: 20.5 });

let justTurnedOn = $ref(false);
let turnedOnTimer: number;
let justTurnedOff = $ref(false);
let turnedOffTimer: number;
watch(
  () => props.rule.enabled,
  (val) => {
    if (val) {
      justTurnedOn = true;
      clearTimeout(turnedOnTimer);
      clearTimeout(turnedOffTimer);
      turnedOnTimer = setTimeout(() => {
        justTurnedOn = false;
      }, 300);
    } else {
      justTurnedOff = true;
      clearTimeout(turnedOffTimer);
      clearTimeout(turnedOnTimer);
      turnedOnTimer = setTimeout(() => {
        justTurnedOff = false;
      }, 300);
    }
  },
);

function onMouseEnter() {
  hovered = true;
  setTitleTranslate({ x: 20 });
}

function onMouseLeave() {
  hovered = false;
  setTitleTranslate({ x: 0 });
}

function onRuleToggle(val: boolean) {
  emit('toggle');
}
</script>

<style lang="scss" scoped>
.rule-card-wrapper:hover {
  .rule-card {
    @apply border-primary;

    &.just-on {
      @apply border-success;
      box-shadow: 0 0 4px 1px hsla(var(--su));
    }
    &.just-off {
      @apply border-neutral;
      box-shadow: 0 0 4px 1px hsla(var(--b3));
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
