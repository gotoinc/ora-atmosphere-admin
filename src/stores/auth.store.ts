import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { AdminUser } from '@/ts/users';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const isEmailConfirmed = ref(false);
        const isAuthenticated = ref(true);
        const isSuperAdmin = ref(true);

        const profile = ref<AdminUser | null>({
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'admin1@example.com',
            company_name: 'Tech Solutions',
            role: 'super admin',
        });

        const logout = () => {
            isAuthenticated.value = false;
        };

        return {
            isEmailConfirmed,
            isAuthenticated,
            isSuperAdmin,
            profile,
            logout,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
