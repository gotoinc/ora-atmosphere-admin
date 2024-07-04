import { useAuthStore } from '@/stores/auth.store.ts';

export default {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth/AuthView.vue'),

    redirect: { name: 'signInView' },

    children: [
        {
            path: '/sign-in',
            name: 'signInView',
            component: () => import('@/views/auth/SignInView.vue'),
            meta: {
                title: 'Sign in',
            },
        },
        {
            path: '/reset-password/:uid/:token/',
            name: 'resetPasswordView',
            component: () => import('@/views/auth/ResetPasswordView.vue'),
            meta: {
                title: 'Reset password',
            },
        },
        {
            path: '/set-new-password',
            name: 'setNewPasswordView',
            component: () => import('@/views/auth/SetNewPasswordView.vue'),

            beforeEnter: () => {
                const { isEmailConfirmed } = useAuthStore();

                if (!isEmailConfirmed) {
                    return { name: 'main' };
                }
            },
        },
    ],
};
