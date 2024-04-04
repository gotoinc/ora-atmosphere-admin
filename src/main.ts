import { createApp } from 'vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Styles
import './assets/tailwind.css';
// Router
import router from '@/router';

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

import App from './App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(router).use(pinia).mount('#app');
