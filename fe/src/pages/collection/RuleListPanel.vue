<template>
  <div class="flex flex-col h-full">
    <div class="flex-1"></div>

    <ButtonGroup v-model="selectedType">
      <Button :name="RuleType.http">HTTP</Button>
      <Button :name="RuleType.rpc">RPC</Button>
      <Button name="all">All</Button>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import ButtonGroup from '@/components/common/ButtonGroup.vue';
import { RuleType } from '~/typings';

const selectedType = $ref(RuleType.http);
</script>
