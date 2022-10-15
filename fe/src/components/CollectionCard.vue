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
          @click.stop="copy(collection.id)"
        >
          # {{ collection.id }}
        </div>

        <Dropdown end>
          <template #reference>
            <Button class="hover:bg-base-300" square ghost @click.stop>
              <More class="text-xl" />
            </Button>
          </template>
          <template #default>
            <Menu class="p-2" rounded>
              <MenuItem @click="testClick">Edit</MenuItem>
              <MenuItem class="text-error">Delete</MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </div>
      <div class="flex-1 flex flex-col justify-between mt-4">
        <div class="text-lg font-semibold">{{ collection.title }}</div>
        <div class="flex items-center">
          <Time />
          <div class="ml-2 text-xs">{{ modifiedTime }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { More, Time } from '@icon-park/vue-next';
import { Collection } from '@shared/typings';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import Button from './common/Button.vue';
import Card from './common/Card.vue';
import Dropdown from './common/Dropdown.vue';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';

interface Props {
  collection: Collection;
}

const props = defineProps<Props>();

function testClick() {
  console.log('click');
}

const modifiedTime = $computed(() => dayjs(props.collection.updatedAt).fromNow());
</script>

<style lang="scss">
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
}
</style>
