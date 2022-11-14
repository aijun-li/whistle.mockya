<template>
  <Modal v-model="visible" :title="`${isEditMode ? 'Update' : 'Create'} ${type.toUpperCase()} Rule`">
    <template #default>
      <div class="form-control mt-2">
        <FormInput
          ref="patternInput"
          v-model="params.pattern"
          :label="patternLabel"
          :validate-func="validatePattern"
          required
          @keydown.enter="descInput?.focus()"
        />
        <FormInput ref="descInput" v-model="params.desc" label="Description" @keydown.enter="onUpsert" />
      </div>
    </template>
    <template #action>
      <Button ghost @click="emit('update:modelValue', false)">Cancel</Button>
      <Button class="ml-2" :loading="upsertLoading" color="primary" @click="onUpsert">
        {{ isEditMode ? 'Update' : 'Create' }}
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { createRule, updateRule } from '@/services';
import { useCollectionStore } from '@/stores';
import { handleError, toast } from '@/utils';
import { whenever } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { nextTick, reactive } from 'vue';
import { Rule, RuleType } from '~/typings';
import Button from './common/Button.vue';
import FormInput from './common/FormInput.vue';
import Modal from './common/Modal.vue';

interface Props {
  modelValue: boolean;
  type: RuleType;
  rule?: Rule;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'refetch']);

const store = useCollectionStore();
const { collection } = $(storeToRefs(store));
const { checkIfRuleExists } = store;

const visible = $computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const patternLabel = $computed(() => (props.type === RuleType.rpc ? 'Service Method' : 'URL Path'));
const isEditMode = $computed(() => Boolean(props.rule));

const params = reactive({
  pattern: '',
  desc: '',
});

whenever(
  () => visible,
  async () => {
    if (isEditMode) {
      Object.assign(params, {
        pattern: props.rule!.pattern,
        desc: props.rule!.desc || '',
      });
    } else {
      Object.assign(params, {
        pattern: '',
        desc: '',
      });
    }
    patternInput?.resetValidation();

    await nextTick();
    patternInput?.focus();
  },
);

const patternInput = $ref<InstanceType<typeof FormInput> | null>(null);
function validatePattern(pattern: string) {
  pattern = pattern.trim();
  if (pattern === '') {
    return `${patternLabel} cannot be empty`;
  }
  if (
    (!isEditMode || (isEditMode && pattern.trim() !== props.rule!.pattern.trim())) &&
    checkIfRuleExists(pattern, props.type)
  ) {
    return 'Pattern already exists';
  }
  return '';
}

const descInput = $ref<InstanceType<typeof FormInput> | null>(null);

let upsertLoading = $ref(false);
async function onUpsert() {
  if (!patternInput?.validate() || upsertLoading) {
    return;
  }

  try {
    upsertLoading = true;

    if (isEditMode) {
      await updateRule({
        ...props.rule!,
        pattern: params.pattern.trim(),
        desc: params.desc.trim(),
      });
      toast.success('Rule updated');
    } else {
      await createRule(collection!.id, {
        type: props.type,
        pattern: params.pattern.trim(),
        enabled: true,
        delay: 0,
        desc: params.desc.trim(),
      });
      toast.success('Rule created');
    }

    emit('update:modelValue', false);
    emit('refetch');
  } catch (error) {
    handleError(error);
  } finally {
    upsertLoading = false;
  }
}
</script>
