import Collection from '@/pages/collection/index.vue';
import Dashboard from '@/pages/dashboard/index.vue';
import Settings from '@/pages/settings/index.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/settings', component: Settings },
  { path: '/collection/:id', component: Collection, props: true },
  { path: '/', component: Dashboard },
];

export default routes;
