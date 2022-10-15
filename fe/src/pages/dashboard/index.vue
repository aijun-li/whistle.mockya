<template>
  <div class="dashboard h-screen flex flex-col">
    <header class="p-4 flex-none flex items-center justify-between">
      <div class="text-2xl font-semibold">Dashboard</div>

      <div class="ml-4 flex items-center">
        <Input ref="searchInput" v-model="searchText" class="w-40 md:w-50 lg:w-60" placeholder="Search" />
        <Button class="ml-2 min-w-20" color="primary">Create</Button>
      </div>
    </header>

    <ElScrollbar class="flex-1" wrap-class="p-4 pt-0">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        un:md="grid-cols-3"
        un:lg="grid-cols-4"
        un:xl="grid-cols-5"
        un:2xl="grid-cols-6"
      >
        <TransitionGroup name="list">
          <CollectionCard
            v-for="collection in filteredCollections"
            :id="collection.id"
            :key="collection.id"
            class="h-65 md:h-70 lg:h-75"
            :title="collection.title"
            :modify-time="collection.modifyTime"
          />
        </TransitionGroup>
      </div>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import CollectionCard from '@/components/CollectionCard.vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import { useFilteredArray, useShortcut } from '@/hooks';
import { Shortcut } from '@/typings/hook';
import { ElScrollbar } from 'element-plus';

const searchInput = $ref<InstanceType<typeof Input> | null>(null);
const searchText = $ref('');

useShortcut(Shortcut.search, () => {
  searchInput?.focus();
});

const collections = $ref(
  Array(20)
    .fill(0)
    .map((_, index) => ({
      id: 'default' + ' ' + index,
      title: 'Default' + ' ' + index,
      modifyTime: 20,
    })),
);
const filteredCollections = $(
  useFilteredArray({
    array: $$(collections),
    field: 'id',
    text: $$(searchText),
  }),
);
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
