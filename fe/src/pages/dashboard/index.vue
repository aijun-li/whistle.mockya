<template>
  <div class="dashboard h-screen flex flex-col">
    <header class="p-4 flex-none flex items-center justify-between">
      <div class="text-2xl font-semibold flex items-center">
        Mock
        <Button class="ml-1 text-xl px-1" color="primary" :uppercase="false" @click="goGitHub">Ya</Button>
      </div>

      <div class="ml-4 flex items-center">
        <Input
          ref="searchInput"
          v-model="searchText"
          class="w-40 md:w-50 lg:w-60 xl:w-70 transition-width"
          placeholder="Search"
        />
        <Button class="ml-2 min-w-20" color="primary" @click="createVisible = true">Create</Button>
      </div>
    </header>

    <div class="flex-1 flex items-center justify-center">
      <Transition>
        <Progress v-if="loading" color="primary" />

        <Hero v-else-if="!collections.length">
          <h1>No Collections Found</h1>
          <p class="py-4">Please refresh page or create new collection</p>
        </Hero>

        <Hero v-else-if="!filteredCollections.length">
          <h1>No Matching Collection</h1>
          <p class="py-4">Try to change your search keyword</p>
        </Hero>

        <ElScrollbar v-else class="flex-1" wrap-class="p-4 pt-0">
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
                @refetch="fetchCollections"
                @click="goDetail(collection.id)"
              />
            </TransitionGroup>
          </div>
        </ElScrollbar>
      </Transition>
    </div>

    <CreateCollectionModal v-model="createVisible" @refetch="fetchCollections" />
  </div>
</template>

<script lang="ts" setup>
import CollectionCard from '@/components/CollectionCard.vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import { useFilteredArray, useShortcut } from '@/hooks';
import { useCollectionsStore } from '@/stores';
import { Shortcut } from '@/typings/hook';

import Hero from '@/components/common/Hero.vue';
import Progress from '@/components/common/Progress.vue';
import CreateCollectionModal from '@/components/CreateCollectionModal.vue';
import { ElScrollbar } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const searchInput = $ref<InstanceType<typeof Input> | null>(null);
const searchText = $ref('');

const router = useRouter();

const store = useCollectionsStore();
const { loading, collections } = $(storeToRefs(store));
const { fetchCollections } = store;

const filteredCollections = $(
  useFilteredArray({
    array: $$(collections),
    field: 'id',
    text: $$(searchText),
  }),
);

fetchCollections();

function goGitHub() {
  window.open('https://github.com/aijun-li/whistle.mockya', '_blank');
}

function goDetail(id: string) {
  router.push(`/collection/${id}`);
}

const createVisible = $ref(false);

useShortcut(Shortcut.search, () => {
  if (createVisible) {
    return;
  }
  searchInput?.focus();
});
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
