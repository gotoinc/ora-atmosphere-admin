import { createRouter, createWebHistory } from 'vue-router';

import baseRoute from '@/router/routes/base.route.ts';

const routes = [baseRoute];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
