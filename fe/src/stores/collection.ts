import { getCollection } from '@/services';
import { handleError } from '@/utils';
import { defineStore } from 'pinia';
import { Collection } from '~/typings';

export const useCollectionStore = defineStore('collection', () => {
  let loading = $ref(true);
  let collection = $ref<Collection | null>(null);

  async function fetchCollection(id: string) {
    try {
      loading = true;
      const data = await getCollection(id);
      collection = data;
    } catch (error) {
      handleError(error);
    } finally {
      loading = false;
    }
  }

  return $$({
    loading,
    collection,
    fetchCollection,
  });
});
