<template>
  <Card class="hover:border-primary transition duration-200" compact bordered>
    <div class="h-full flex flex-col">
      <div class="flex-none flex justify-between items-center">
        <div class="bg-base-300 w-70% px-4 rounded-r-2 transform -translate-x-4 truncate font-medium py-2px">
          # {{ id }}
        </div>

        <Dropdown end>
          <template #reference>
            <Button class="hover:bg-base-300" square ghost>
              <More class="text-xl" />
            </Button>
          </template>
          <template #default>
            <Menu class="p-2" rounded>
              <MenuItem @click="testClick">Edit</MenuItem>
              <MenuItem class="text-error">Delete</MenuItem>
            </Menu>
          </template>
        </Dropdown>
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
import Button from './common/Button.vue';
import Card from './common/Card.vue';
import Dropdown from './common/Dropdown.vue';
import Menu from './common/Menu.vue';
import MenuItem from './common/MenuItem.vue';

interface Props {
  id: string;
  title: string;
  modifyTime: number;
}

defineProps<Props>();

function testClick() {
  console.log('click');
}
</script>
