import { useAuthStore } from '@/stores/auth.store.ts';
import { useSignUpStore } from '@/stores/sign-up.store.ts';

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
            path: '/sign-up',
            name: 'signUpView',
            component: () => import('@/views/auth/SignUpView.vue'),
            meta: {
                title: 'Sign up',
            },

            redirect: { name: 'signUpFirstStep' },

            children: [
                {
                    path: '1',
                    name: 'signUpFirstStep',
                    component: () =>
                        import('@/views/auth/SignUpFirstStepView.vue'),
                },
                {
                    path: '2',
                    name: 'signUpSecondStep',
                    component: () =>
                        import('@/views/auth/SignUpSecondStepView.vue'),

                    beforeEnter: () => {
                        const { firstStepValues, validateObject } =
                            useSignUpStore();

                        if (!validateObject(firstStepValues)) {
                            return { name: 'signUpFirstStep' };
                        }
                    },
                },
            ],
        },
        {
            path: '/reset-password',
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
