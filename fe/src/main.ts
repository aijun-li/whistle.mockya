import '@icon-park/vue-next/styles/index.css';
import '@kidonng/daisyui/index.css';
import '@unocss/reset/tailwind.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { createPinia } from 'pinia';
import 'uno.css';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import './global.scss';
import routes from './routes';

dayjs.extend(relativeTime);
// dayjs.locale('zh-cn');

const app = createApp(App);

const pinia = createPinia();

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(router);
app.use(pinia);

app.mount('#app');
