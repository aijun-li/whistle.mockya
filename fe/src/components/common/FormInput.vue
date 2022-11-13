<template>
  <div class="form-control relative pb-4 pt-2">
    <div class="flex items-center">
      <span class="font-semibold">
        <template v-if="required">
          {{ label }}
          <sup class="text-error">*</sup>
        </template>
        <template v-else>{{ label }}</template>
      </span>
      <Tooltip v-if="tip" class="ml-2" :tip="tip" position="right">
        <Help class="cursor-help" />
      </Tooltip>
    </div>
    <Input
      ref="input"
      v-model="value"
      class="mt-1"
      :placeholder="placeholder"
      :color="errorMsg ? 'error' : ''"
      @input="onInput"
    />
    <Transition>
      <div v-if="errorMsg" class="text-error absolute -bottom-1 text-xs">
        {{ errorMsg }}
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { Help } from '@icon-park/vue-next';
import Input from './Input.vue';
import Tooltip from './Tooltip.vue';

interface Props {
  modelValue: string;
  label: string;
  placeholder?: string;
  tip?: string;
  required?: boolean;
  validateFunc?: (t: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  tip: '',
  required: false,
  validateFunc: () => '',
});
const emit = defineEmits(['update:modelValue', 'input']);

const value = $computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

let errorMsg = $ref('');

function onInput(t: string) {
  errorMsg = props.validateFunc?.(t) ?? '';
  emit('input', t);
}

const input = $ref<InstanceType<typeof Input> | null>(null);
function focus() {
  input?.focus();
}

function validate() {
  errorMsg = props.validateFunc?.(value) ?? '';
  return !errorMsg;
}

function resetValidation() {
  errorMsg = '';
}

defineExpose({
  focus,
  validate,
  resetValidation,
});
</script>
