<template>
  <div class="flex items-center justify-center h-screen">
    <Transition>
      <Progress v-if="loading" color="primary" />

      <Hero v-else-if="!collection">
        <h1>Failed To Get Collection Info</h1>
        <p class="py-4">Please refresh page and try again</p>
        <Button color="primary" size="md" @click="reloadPage"><Refresh class="mr-2" />Refresh </Button>
      </Hero>

      <ResizeLayout v-else local-key="collection-home" start-min="30%" end-min="30%">
        <template #start>
          <RuleListPanel @create-rule="onCreateRule" @update-rule="onUpdateRule" @refetch="fetchCollection(id)" />
        </template>
        <template #end>
          <Editor />
        </template>
      </ResizeLayout>
    </Transition>

    <UpsertRuleModal
      v-model="upsertRuleVisible"
      :type="upsertRuleType"
      :rule="updateRule"
      @refetch="fetchCollection(id)"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import Editor from '@/components/common/Editor/Editor.vue';
import Hero from '@/components/common/Hero.vue';
import Progress from '@/components/common/Progress.vue';
import ResizeLayout from '@/components/common/ResizeLayout.vue';
import UpsertRuleModal from '@/components/UpsertRuleModal.vue';
import { useCollectionStore } from '@/stores';
import { CreateRuleType } from '@/typings';
import { Refresh } from '@icon-park/vue-next';
import { whenever } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { Rule, RuleType } from '~/typings';
import RuleListPanel from './RuleListPanel.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const store = useCollectionStore();
const { loading, collection } = $(storeToRefs(store));
const { fetchCollection } = store;

fetchCollection(props.id);

function reloadPage() {
  window.location.reload();
}

/* ----- Upsert Rule start ----- */
let upsertRuleVisible = $ref(false);
let upsertRuleType = $ref(RuleType.http);
let updateRule = $ref<Rule | undefined>(undefined);

whenever(
  () => !upsertRuleVisible,
  () => {
    updateRule = undefined;
  },
);

function onCreateRule(type: CreateRuleType) {
  if (type === CreateRuleType.http) {
    upsertRuleType = RuleType.http;
    upsertRuleVisible = true;
  } else if (type === CreateRuleType.rpc) {
    upsertRuleType = RuleType.rpc;
    upsertRuleVisible = true;
  }
}

function onUpdateRule(rule: Rule) {
  upsertRuleType = rule.type;
  updateRule = rule;
  upsertRuleVisible = true;
}
/* ----- Upsert Rule end ----- */
</script>
