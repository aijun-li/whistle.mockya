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

    <div class="flex items-center justify-between mt-4">
      <Input class="flex-1 mr-8" placeholder="search" />

      <Dropdown end>
        <template #reference>
          <Button class="w-max" color="primary">Create <Down class="ml-1" /></Button>
        </template>
        <template #default>
          <Menu class="w-max p-2" rounded>
            <MenuItem>HTTP</MenuItem>
            <MenuItem>RPC</MenuItem>
            <MenuItem>RPC (Gen)</MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import ButtonGroup from '@/components/common/ButtonGroup.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import Input from '@/components/common/Input.vue';
import Menu from '@/components/common/Menu.vue';
import MenuItem from '@/components/common/MenuItem.vue';
import { useCollectionStore } from '@/stores';
import { Down } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { RuleType } from '~/typings';

const selectedType = $ref(RuleType.all);

const { collection } = $(storeToRefs(useCollectionStore()));
</script>
