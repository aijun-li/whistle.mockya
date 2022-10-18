import Dashboard from '@/pages/dashboard/index.vue';
import Settings from '@/pages/settings/index.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Dashboard },
  { path: '/settings', component: Settings },
];

export default routes;
