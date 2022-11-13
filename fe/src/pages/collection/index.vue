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
          <RuleListPanel @create="onCreateRule" />
        </template>
        <template #end>
          <Editor />
        </template>
      </ResizeLayout>
    </Transition>

    <CreateRuleModal v-model="createRuleVisible" :type="createRuleType" @refetch="fetchCollection(id)" />
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import Editor from '@/components/common/Editor/Editor.vue';
import Hero from '@/components/common/Hero.vue';
import Progress from '@/components/common/Progress.vue';
import ResizeLayout from '@/components/common/ResizeLayout.vue';
import CreateRuleModal from '@/components/CreateRuleModal.vue';
import { useCollectionStore } from '@/stores';
import { CreateRuleType } from '@/typings';
import { Refresh } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { RuleType } from '~/typings';
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

/* ----- Create Rule start ----- */
let createRuleVisible = $ref(false);
let createRuleType = $ref<Exclude<RuleType, RuleType.all>>(RuleType.http);

function onCreateRule(type: CreateRuleType) {
  if (type === CreateRuleType.http) {
    createRuleType = RuleType.http;
    createRuleVisible = true;
  } else if (type === CreateRuleType.rpc) {
    createRuleType = RuleType.rpc;
    createRuleVisible = true;
  }
}
/* ----- Create Rule end ----- */
</script>
