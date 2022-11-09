<template>
  <div class="flex flex-col h-full">
    <div class="flex-1"></div>

    <BottomNav v-model="selectedType" size="sm">
      <BottomNavItem :name="RuleType.http"> HTTP </BottomNavItem>
      <BottomNavItem :name="RuleType.rpc"> RPC </BottomNavItem>
    </BottomNav>
  </div>
</template>

<script lang="ts" setup>
import BottomNav from '@/components/common/BottomNav.vue';
import BottomNavItem from '@/components/common/BottomNavItem.vue';
import { RuleType } from '~/typings';

const selectedType = $ref(RuleType.http);
</script>
