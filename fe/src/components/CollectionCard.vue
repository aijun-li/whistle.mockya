<template>
  <Card
    class="collection-card hover:border-primary active:border-primary-focus transition duration-200"
    compact
    bordered
  >
    <div class="h-full flex flex-col">
      <div class="flex-none flex justify-between items-center">
        <div
          class="collection-id transition duration-200 bg-base-300 w-70% px-4 rounded-r-2 transform -translate-x-4 truncate font-medium cursor-pointer py-2px select-none"
          @click.stop="onCopy"
        >
          # {{ collection.id }}
        </div>

        <Dropdown end>
          <template #reference>
            <Button class="hover:bg-base-300" square ghost @click.stop="() => {}">
              <More class="text-xl" />
            </Button>
          </template>
          <template #default>
            <Menu class="p-2 w-25" rounded>
              <MenuItem @click.stop="onEditClick">Edit</MenuItem>
              <MenuItem
                class="text-error"
                :class="{ 'delete-option__confirmed': deleteConfirmed }"
                @click.stop="onDeleteClick"
              >
                {{ deleteConfirmed ? 'Confirm' : 'Delete' }}
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </div>
      <div class="flex-1 flex flex-col justify-between mt-4">
        <div v-if="!inEdit" class="text-lg font-semibold">{{ collection.title }}</div>
        <Input
          v-else
          ref="editInput"
          v-model="newTitle"
          :placeholder="collection.title"
          @blur="onEditChange"
          @keydown.enter="onEditChange"
        />
        <div class="flex items-center">
          <Time />
          <div class="ml-2 text-xs">{{ modifiedTime }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { useDoubleConfirm } from '@/hooks';
import { deleteCollection, updateCollection } from '@/services';
import { toast } from '@/utils';
import { More, Time } from '@icon-park/vue-next';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { nextTick } from 'vue';
import { Collection } from '~/typings';
import Button from './common/Button.vue';
import Card from './common/Card.vue';
import Dropdown from './common/Dropdown.vue';
import Input from './common/Input.vue';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';

interface Props {
  collection: Collection;
}

const props = defineProps<Props>();
const emit = defineEmits(['refetch']);

const modifiedTime = $computed(() => dayjs(props.collection.updatedAt).fromNow());

function onCopy() {
  if (copy(props.collection.id)) {
    toast.success('Copied');
  }
}

let inEdit = $ref(false);
let newTitle = $ref('');
const editInput = $ref<InstanceType<typeof Input> | null>(null);
async function onEditClick() {
  inEdit = true;
  await nextTick();
  editInput?.focus();
}
async function onEditChange() {
  if (newTitle.trim()) {
    try {
      await updateCollection({
        id: props.collection.id,
        title: newTitle,
      });

      emit('refetch');
    } catch (error) {
      console.error(error);
    }
  }
  inEdit = false;
  newTitle = '';
}

let deleteConfirmed = $(useDoubleConfirm());
async function onDeleteClick() {
  if (!deleteConfirmed) {
    deleteConfirmed = true;
  } else {
    try {
      await deleteCollection(props.collection.id);
      toast.success('Deleted');
      emit('refetch');
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.collection-card {
  &:hover {
    .collection-id {
      @apply bg-primary text-primary-content;
    }
  }

  &:active {
    .collection-id {
      @apply bg-primary-focus;
    }
  }

  .delete-option__confirmed {
    :deep() a {
      @apply hover:bg-error text-error-content;
    }
  }
}
</style>
