export default {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth/AuthView.vue'),

    redirect: { name: 'login' },

    children: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
            meta: {
                title: 'Sign in',
            },
        },
        {
            path: '/reset-password',
            name: 'resetPassword',
            component: () => import('@/views/auth/ResetPasswordView.vue'),
            meta: {
                title: 'Reset password',
            },
        },
        {
            path: '/recover-sent',
            name: 'recoverSent',
            component: () => import('@/views/auth/ResetSentView.vue'),
        },
        {
            path: '/set-new-password',
            name: 'setNewPassword',
            component: () => import('@/views/auth/SetNewPasswordView.vue'),
        },
    ],
};
