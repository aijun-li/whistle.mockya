import { getCollections } from '@/services';
import { handleError } from '@/utils';
import { defineStore } from 'pinia';
import { Collection } from '~/typings';

export const useCollectionsStore = defineStore('collections', () => {
  let loading = $ref(true);
  let collections = $ref<Collection[]>([]);

  async function fetchCollections() {
    try {
      loading = true;
      const data = await getCollections();
      collections = data;
    } catch (error) {
      handleError(error);
    } finally {
      loading = false;
    }
  }

  function checkIfIdExists(id: string) {
    return collections.some((collection) => collection.id === id);
  }

  return $$({
    loading,
    collections,
    fetchCollections,
    checkIfIdExists,
  });
});
