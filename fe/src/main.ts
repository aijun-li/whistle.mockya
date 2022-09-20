import '@icon-park/vue-next/styles/index.css';
import '@kidonng/daisyui/index.css';
import '@unocss/reset/tailwind.css';
import { createPinia } from 'pinia';
import 'uno.css';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes';

const app = createApp(App);

const pinia = createPinia();

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(router);
app.use(pinia);

app.mount('#app');
