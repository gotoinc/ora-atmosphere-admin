import { createApp } from 'vue';
import type { PluginOptions } from 'vue-toastification';
import { POSITION } from 'vue-toastification';
import Toast from 'vue-toastification';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Styles
import 'vuetify/styles';
import 'vue-toastification/dist/index.css';
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';
// Router
import router from '@/router';

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

import App from './App.vue';
import vuetify from './vuetify.ts';

// Toast options
const toastOptions: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    pauseOnHover: false,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App)
    .use(router)
    .use(pinia)
    .use(vuetify)
    .use(Toast, toastOptions)
    .mount('#app');
