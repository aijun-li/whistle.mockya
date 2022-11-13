<template>
  <Modal v-model="visible" title="Create Collection">
    <template #default>
      <div class="form-control mt-2">
        <FormInput
          ref="idInput"
          v-model="params.id"
          label="ID"
          tip="unique string without space"
          :validate-func="validateId"
          required
          @keydown.enter="titleInput?.focus()"
        />
        <FormInput
          ref="titleInput"
          v-model="params.title"
          label="Title"
          :validate-func="validateTitle"
          required
          @keydown.enter="onCreate"
        />
      </div>
    </template>
    <template #action>
      <Button ghost @click="emit('update:modelValue', false)">Cancel</Button>
      <Button class="ml-2" :loading="createLoading" color="primary" @click="onCreate">Create</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import { createCollection } from '@/services';
import { useCollectionsStore } from '@/stores';
import { handleError, toast } from '@/utils';
import { whenever } from '@vueuse/core';
import { nextTick, reactive } from 'vue';
import FormInput from './common/FormInput.vue';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'refetch']);

const { checkIfIdExists } = useCollectionsStore();

const visible = $computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const params = reactive({
  id: '',
  title: '',
});

whenever(
  () => visible,
  async () => {
    Object.assign(params, {
      id: '',
      title: '',
    });
    idInput?.resetValidation();
    titleInput?.resetValidation();

    await nextTick();
    idInput?.focus();
  },
);

const idInput = $ref<InstanceType<typeof FormInput> | null>(null);
function validateId(id: string) {
  id = id.trim();
  if (id === '') {
    return 'ID cannot be empty';
  }
  if (/\s+/.test(id)) {
    return 'ID cannot contain space';
  }
  if (checkIfIdExists(id)) {
    return 'ID already exists';
  }
  return '';
}

const titleInput = $ref<InstanceType<typeof FormInput> | null>(null);
function validateTitle(title: string) {
  title = title.trim();
  if (title === '') {
    return 'Title cannot be empty';
  }
  return '';
}

let createLoading = $ref(false);
async function onCreate() {
  if ([!idInput?.validate(), !titleInput?.validate()].some(Boolean) || createLoading) {
    return;
  }

  try {
    createLoading = true;
    await createCollection({
      id: params.id.trim(),
      title: params.title.trim(),
    });

    toast.success('Created');

    emit('update:modelValue', false);
    emit('refetch');
  } catch (error) {
    handleError(error);
  } finally {
    createLoading = false;
  }
}
</script>
