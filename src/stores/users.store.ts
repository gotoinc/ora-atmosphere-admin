import { ref } from 'vue';

import { defineStore } from 'pinia';

import { getAdminUsers } from '@/api/users/get-admin-users.api.ts';
import { getRegularUsers } from '@/api/users/get-regular-users.api.ts';
import type { UserProfile } from '@/ts/users';

export const useUsersStore = defineStore(
    'users',
    () => {
        const admins = ref<UserProfile[]>([]);
        const regularUsers = ref<UserProfile[]>([]);

        const isLoading = ref(false);

        const loadAdmins = async () => {
            isLoading.value = true;

            try {
                admins.value = (await getAdminUsers()) ?? [];
            } finally {
                isLoading.value = false;
            }
        };

        const loadRegularUsers = async () => {
            isLoading.value = true;

            try {
                regularUsers.value = (await getRegularUsers()) ?? [];
            } finally {
                isLoading.value = false;
            }
        };

        return {
            admins,
            regularUsers,
            isLoading,
            loadAdmins,
            loadRegularUsers,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
