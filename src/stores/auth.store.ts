import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const auth = ref('');

        return {
            auth,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
