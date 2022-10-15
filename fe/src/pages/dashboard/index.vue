<template>
  <div class="dashboard h-screen flex flex-col">
    <header class="p-4 flex-none flex items-center justify-between">
      <div class="text-2xl font-semibold flex items-center">
        Mock
        <Button class="ml-1 text-xl px-1" color="primary" @click="goGitHub">YA</Button>
      </div>

      <div class="ml-4 flex items-center">
        <Input
          ref="searchInput"
          v-model="searchText"
          class="w-40 md:w-50 lg:w-60 xl:w-70 transition-width"
          placeholder="Search"
        />
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
            :key="collection.id"
            class="h-65 md:h-70 lg:h-75"
            :collection="collection"
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
import { useCollectionStore } from '@/stores';
import { Shortcut } from '@/typings/hook';
import { ElScrollbar } from 'element-plus';
import { storeToRefs } from 'pinia';

const searchInput = $ref<InstanceType<typeof Input> | null>(null);
const searchText = $ref('');

useShortcut(Shortcut.search, () => {
  searchInput?.focus();
});

const store = useCollectionStore();
const { loading, collections } = $(storeToRefs(store));

const filteredCollections = $(
  useFilteredArray({
    array: $$(collections),
    field: 'id',
    text: $$(searchText),
  }),
);

function goGitHub() {
  window.open('https://github.com/aijun-li/whistle.mockya', '_blank');
}
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
