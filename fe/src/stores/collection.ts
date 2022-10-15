import { getCollection } from '@/services';
import { Collection } from '@shared/typings';
import { defineStore } from 'pinia';

export const useCollectionStore = defineStore('collections', () => {
  let loading = $ref(true);
  let collections = $ref<Collection[]>([]);

  async function fetchCollections() {
    try {
      loading = true;
      const data = await getCollection();
      collections = data;
    } catch (error) {
      // TODO
    } finally {
      loading = false;
    }
  }

  fetchCollections();

  return $$({
    loading,
    collections,
    fetchCollections,
  });
});
