<template>
  <Card class="hover:border-primary transition duration-200" compact bordered>
    <div class="h-full flex flex-col">
      <div class="flex-none flex justify-between items-center">
        <div class="bg-base-300 w-70% px-4 rounded-r transform -translate-x-4 truncate font-medium"># {{ id }}</div>
        <div class="text-xl cursor-pointer rounded px-1 hover:bg-base-200">
          <More />
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-between mt-4">
        <div class="text-lg font-semibold">{{ title }}</div>
        <div class="flex items-center">
          <Time />
          <div class="ml-2 text-xs">{{ modifyTime }} hours ago</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { More, Time } from '@icon-park/vue-next';
import Card from './common/Card.vue';

interface Props {
  id: string;
  title: string;
  modifyTime: number;
}

defineProps<Props>();
</script>
