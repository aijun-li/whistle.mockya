import { getCollection } from '@/services';
import { handleError } from '@/utils';
import { defineStore } from 'pinia';
import { Collection, RuleType } from '~/typings';

export const useCollectionStore = defineStore('collection', () => {
  let loading = $ref(true);
  let collection = $ref<Collection | null>(null);

  const rpcRules = $computed(() => collection?.rules.filter((rule) => rule.type === RuleType.rpc) ?? []);
  const httpRules = $computed(() => collection?.rules.filter((rule) => rule.type === RuleType.http) ?? []);

  function checkIfRuleExists(pattern: string, type: RuleType) {
    const rules = type === RuleType.rpc ? rpcRules : httpRules;
    return rules.some((rule) => rule.pattern === pattern);
  }

  async function fetchCollection(id: string) {
    try {
      if (!collection) {
        loading = true;
      }
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
    checkIfRuleExists,
  });
});
