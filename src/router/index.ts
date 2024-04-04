import { createRouter, createWebHistory } from 'vue-router';

import authRoute from '@/router/routes/auth.route.ts';
import baseRoute from '@/router/routes/base.route.ts';

const routes = [baseRoute, authRoute];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
