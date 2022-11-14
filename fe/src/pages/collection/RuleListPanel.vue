<template>
  <div class="flex flex-col h-full p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-end mr-4">
        <div class="font-bold text-3xl truncate">{{ collection!.title }}</div>
        <div class="flex-none font-semibold text-lg ml-2"># {{ collection!.id }}</div>
      </div>
      <ButtonGroup v-model="selectedType">
        <Button :name="RuleType.http" size="xs" outline>HTTP</Button>
        <Button :name="RuleType.all" size="xs" outline>All</Button>
        <Button :name="RuleType.rpc" size="xs" outline>RPC</Button>
      </ButtonGroup>
    </div>

    <div class="flex items-center justify-between mt-2">
      <Input v-model="searchText" class="flex-1 mr-8" placeholder="search" />

      <Dropdown trigger="hover" end>
        <template #reference>
          <Button class="w-max" color="primary">Create <Down class="ml-1" /></Button>
        </template>
        <template #default>
          <Menu class="w-max p-2" rounded>
            <MenuItem @click.stop="emit('create', CreateRuleType.http)">HTTP</MenuItem>
            <MenuItem @click.stop="emit('create', CreateRuleType.rpc)">RPC</MenuItem>
            <MenuItem @click.stop="emit('create', CreateRuleType.gen)">RPC (Gen)</MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>

    <ElScrollbar class="flex-1 mt-2 -mx-4 px-4" wrap-class="-mx-4 px-4">
      <TransitionGroup name="list">
        <RuleCard v-for="rule in rules" :key="rule.id" class="my-2" :rule="rule" @delete="onDeleteRule(rule)" />
      </TransitionGroup>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import ButtonGroup from '@/components/common/ButtonGroup.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import Input from '@/components/common/Input.vue';
import Menu from '@/components/common/Menu.vue';
import MenuItem from '@/components/common/MenuItem.vue';
import RuleCard from '@/components/RuleCard.vue';
import { deleteRule } from '@/services';
import { useCollectionStore } from '@/stores';
import { CreateRuleType, LocalStorageKey } from '@/typings';
import { handleError, toast } from '@/utils';
import { Down } from '@icon-park/vue-next';
import { useStorage } from '@vueuse/core';
import { ElScrollbar } from 'element-plus';
import { storeToRefs } from 'pinia';
import { Rule, RuleType } from '~/typings';

const emit = defineEmits<{
  (e: 'create', type: CreateRuleType): void;
  (e: 'refetch'): void;
}>();

const store = useCollectionStore();
const { collection, allRules, rpcRules, httpRules } = $(storeToRefs(store));

const selectedType = $(useStorage(LocalStorageKey.rulePanelDefaultType, RuleType.all));
const rules = $computed(() => {
  switch (selectedType) {
    case RuleType.all:
      return allRules;
    case RuleType.http:
      return httpRules;
    case RuleType.rpc:
      return rpcRules;
  }
});

const searchText = $ref('');

async function onDeleteRule(rule: Rule) {
  try {
    deleteRule(rule);
    toast.success('Rule Deleted');
    emit('refetch');
  } catch (error) {
    handleError(error);
  }
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
  transform: translateX(-30px);
}
</style>
