import { createApp } from 'vue';
import Toast from 'vue-toastification';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Styles
import 'vuetify/styles';
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';
// Router
import router from '@/router';

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// Toast options
const toastOptions: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    pauseOnHover: false,
};

import type { PluginOptions } from 'vue-toastification';
import { POSITION } from 'vue-toastification';

import App from './App.vue';
import vuetify from './vuetify.ts';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App)
    .use(router)
    .use(pinia)
    .use(vuetify)
    .use(Toast, toastOptions)
    .mount('#app');
