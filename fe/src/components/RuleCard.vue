<template>
  <Card
    class="rule-card border-base-300 transition-all duration-200"
    :class="{ 'opacity-60': false && !rule.enabled && !hovered, 'just-on': justTurnedOn, 'just-off': justTurnedOff }"
    bordered
    compact
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="panel-viewport h-52px overflow-hidden">
      <div class="panel-group" :style="{ transform: `translateY(${panelTranslate.y}%)` }">
        <div class="panel relative">
          <div class="flex items-center">
            <Toggle
              class="rule-toggle absolute"
              :class="{ 'transition-controlled': !expanded }"
              :model-value="rule.enabled"
              color="success"
              @update:model-value="onRuleToggle"
            />

            <div class="ml-8" :style="{ transform: `translateX(${titleTranslate.x}px)` }">
              <div class="font-semibold">{{ rule.pattern }}</div>
              <div class="text-xs opacity-60">{{ rule.desc || 'No Description' }}</div>
            </div>
          </div>

          <div class="absolute right-0 top-0 flex items-center justify-center h-full px-4">
            <Transition name="operation" :duration="400">
              <div v-if="hovered" class="flex items-center justify-center">
                <div class="operation-btn edit-btn">
                  <Button square ghost @click="emit('edit')">
                    <Edit />
                  </Button>
                </div>
                <div class="operation-btn stopwatch-btn">
                  <Button square ghost @click="onStopwatchClick">
                    <StopwatchStart />
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
              </div>
              <Badge v-else class="delay-badge !rounded-box" :class="{ enabled: rule.enabled }" size="md" outline>
                {{ rule.delay }}s
              </Badge>
            </Transition>
          </div>
        </div>

        <div class="panel flex items-center justify-center" @click="onDelayConfirm">
          <DelaySlider :model-value="rule.delay" @update:model-value="emit('delay', $event)" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { useDoubleConfirm } from '@/hooks';
import { Delete, Edit, StopwatchStart } from '@icon-park/vue-next';
import { useSpring } from '@vueuse/motion';
import { reactive, watch } from 'vue';
import { Rule } from '~/typings';
import Badge from './common/Badge.vue';
import Button from './common/Button.vue';
import Card from './common/Card.vue';
import Toggle from './common/Toggle.vue';
import DelaySlider from './DelaySlider.vue';

interface Props {
  rule: Rule;
}

const props = defineProps<Props>();
const emit = defineEmits(['edit', 'delete', 'toggle', 'delay']);

let hovered = $ref(false);

const { preconfirmed: deletePreconfirmed, trigger: onDelete } = $(
  useDoubleConfirm(() => {
    emit('delete');
  }),
);

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

let expanded = $ref(false);
let expandedTimer: number;
watch(
  () => hovered,
  (val) => {
    if (val) {
      clearTimeout(expandedTimer);
      setTimeout(() => {
        expanded = true;
      }, 200);
    } else {
      clearTimeout(expandedTimer);
      expanded = false;
    }
  },
);

const panelTranslate = reactive({ y: 0 });
const { set: setPanelTranslate } = useSpring(panelTranslate, { duration: 600 });
function onStopwatchClick() {
  setPanelTranslate({ y: -50 });
}
function onDelayConfirm() {
  setPanelTranslate({ y: 0 });
}

const titleTranslate = reactive({ x: 0 });
const { set: setTitleTranslate } = useSpring(titleTranslate, { stiffness: 220, damping: 14 });

function onMouseEnter() {
  hovered = true;
  setTitleTranslate({ x: 12 });
}

function onMouseLeave() {
  hovered = false;
  setTitleTranslate({ x: 0 });
}

function onRuleToggle() {
  emit('toggle');
}
</script>

<style lang="scss" scoped>
.rule-card {
  @apply shadow;
  :deep(.card-body) {
    @apply p-0;
  }

  &:hover {
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

  &:not(:hover) {
    .rule-toggle {
      @apply w-5;
      box-shadow: 0 0 0 2px hsl(var(--b1)) inset;
    }
  }
}

.rule-toggle.transition-controlled {
  transition: background, box-shadow var(--animation-input, 0.2s) ease-in-out 0.2s,
    width var(--animation-input, 0.2s) ease-in-out;
}

.panel {
  @apply h-52px py-2 px-4;
}

.delay-badge {
  border-color: hsla(var(--bc), 0.3);
  color: hsla(var(--bc), 0.3);

  &.enabled {
    border-color: hsla(var(--su));
    color: hsla(var(--su));
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
    transition: all 0.2s ease-in-out;
  }
  .stopwatch-btn {
    transition-delay: 0.1s;
  }
  .delete-btn {
    transition-delay: 0.2s;
  }
  &.delay-badge {
    @apply absolute right-4;
    transition: all 0.2s ease-in-out;
  }
}

.operation-enter-active.delay-badge {
  transition-delay: 0.2s;
}

.operation-enter-from,
.operation-leave-to {
  .operation-btn {
    opacity: 0;
    transform: translateY(4px);
  }
  &.delay-badge {
    opacity: 0;
    transform: translateY(-4px);
  }
}
</style>
