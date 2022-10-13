<template>
  <div class="dashboard h-screen p-4 flex flex-col">
    <header class="flex-none flex items-center justify-between">
      <div class="text-2xl font-semibold">Dashboard</div>

      <div class="flex items-center">
        <Input placeholder="Search" />
        <Button class="ml-2" color="primary">Create</Button>
      </div>
    </header>

    <div class="flex-1 mt-4 flex">
      <CollectionCard id="default" title="Default" :modify-time="20" class="w-60 h-65" />
      <CollectionCard id="client" title="Client" :modify-time="15" class="w-60 h-65 ml-4" />
      <CollectionCard id="roster" title="Roster" :modify-time="10" class="w-60 h-65 ml-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollectionCard from '@/components/CollectionCard.vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
</script>
