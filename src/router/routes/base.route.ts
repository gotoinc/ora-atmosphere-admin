import categoriesRoute from '@/router/routes/categories.route.ts';
import contentsRoute from '@/router/routes/contents.route.ts';
import dashboardRoute from '@/router/routes/dashboard.route.ts';
import profileRoute from '@/router/routes/profile.route.ts';

export default {
    path: '/main',
    name: 'main',
    component: () => import('@/views/MainView.vue'),

    meta: { requiresAuth: true },

    redirect: { name: 'dashboard' },

    children: [dashboardRoute, contentsRoute, categoriesRoute, profileRoute],
};
