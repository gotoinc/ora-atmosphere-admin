export default {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/ProfileView.vue'),

    meta: { title: 'Profile' },

    redirect: { name: 'profileInfoView' },

    children: [
        {
            path: 'info',
            name: 'profileInfoView',
            component: () => import('@/views/profile/ProfileInfoView.vue'),
        },
        {
            path: 'password',
            name: 'profilePasswordView',
            component: () => import('@/views/profile/ProfilePasswordView.vue'),
        },
    ],
};
