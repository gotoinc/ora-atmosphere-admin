import { ref } from 'vue';
import Cookies from 'js-cookie';

import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const isEmailConfirmed = ref(false);
        const isAuthenticated = ref(!!Cookies.get('ora_admin'));

        const clearAuth = () => {
            Cookies.remove('ora_admin');
            isAuthenticated.value = false;
        };

        return {
            isEmailConfirmed,
            isAuthenticated,
            clearAuth,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
