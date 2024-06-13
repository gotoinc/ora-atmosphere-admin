import { createApp } from 'vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Styles
import 'vuetify/styles';
import './assets/tailwind.css';
// Router
import router from '@/router';

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

import App from './App.vue';
import vuetify from './vuetify.ts';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
