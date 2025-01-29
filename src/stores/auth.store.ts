import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

import { defineStore } from 'pinia';

import { authLogin } from '@/api/auth/auth-login.api.ts';
import { authLogout } from '@/api/auth/auth-logout.api.ts';
import { getProfile } from '@/api/auth/get-profile.api.ts';
import { getAuthToken, removeAuthToken, setAuthToken } from '@/api/cookies.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import router from '@/router';
import type { AdminUser } from '@/ts/users';
import type { SignInInput } from '@/validations/types/auth';

const toast = useToast();

export const useAuthStore = defineStore(
    'auth',
    () => {
        const isEmailConfirmed = ref(false);
        const isAuthenticated = ref(!!getAuthToken());
        const isSuperAdmin = computed(
            () => profile.value?.role === 'super-admin'
        );

        const profile = ref<AdminUser | null>();

        const profileName = computed(
            () => `${profile.value?.first_name} ${profile.value?.last_name}`
        );

        const clearAuth = () => {
            removeAuthToken();
            isAuthenticated.value = false;
            profile.value = null;
            toast.clear();
        };

        const getProfileInfo = async () => {
            try {
                const res = await getProfile();

                if (res) {
                    profile.value = res;
                }

                return profile.value;
            } catch (e) {
                clearAuth();
                // void logout();
                void router.replace({ name: 'auth' });
            }
        };

        // Logout functionality
        const logout = async () => {
            try {
                const res = await authLogout();

                if (res) {
                    clearAuth();
                    toast.success(res.detail);
                }
            } catch (e) {
                toast.error('Logout error');
            }
        };

        // Login functionality
        const login = async (body: SignInInput, remember?: boolean) => {
            try {
                const res = await authLogin(body);

                if (res) {
                    setAuthToken(res.token, remember);

                    toast.success('Login success');

                    isAuthenticated.value = true;
                }
            } catch (err) {
                toast.error('Unable to log in with provided credentials.');

                useThrowError(err);
            }
        };

        return {
            isEmailConfirmed,
            isAuthenticated,
            isSuperAdmin,
            profile,
            profileName,
            clearAuth,
            getProfileInfo,
            login,
            logout,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
