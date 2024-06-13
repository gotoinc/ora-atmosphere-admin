import { useAuthStore } from '@/stores/auth.store.ts';

export default {
    path: '/users',
    name: 'usersView',
    component: () => import('@/views/users/UsersView.vue'),

    meta: { title: 'Users' },

    redirect: { name: 'regularUsersView' },

    beforeEnter: () => {
        const { isSuperAdmin } = useAuthStore();

        if (!isSuperAdmin) {
            return { name: 'main' };
        }
    },

    children: [
        {
            path: 'regular-users',
            name: 'regularUsersView',
            component: () => import('@/views/users/RegularUsersView.vue'),
        },
        {
            path: 'admins',
            name: 'adminsView',
            component: () => import('@/views/users/AdminsView.vue'),
        },
    ],
};
