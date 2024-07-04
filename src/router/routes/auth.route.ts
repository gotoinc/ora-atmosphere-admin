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
            path: '/forgot-password',
            name: 'forgotPasswordView',
            component: () => import('@/views/auth/ForgotPasswordView.vue'),
        },
    ],
};
