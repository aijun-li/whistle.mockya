import { getCollection } from '@/services';
import { defineStore } from 'pinia';
import { Collection } from '~/typings';

export const useCollectionStore = defineStore('collections', () => {
  let loading = $ref(true);
  let collections = $ref<Collection[]>([]);

  async function fetchCollections() {
    try {
      const data = await getCollection();
      collections = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  }

  function checkIfIdExists(id: string) {
    return collections.some((collection) => collection.id === id);
  }

  fetchCollections();

  return $$({
    loading,
    collections,
    fetchCollections,
    checkIfIdExists,
  });
});
