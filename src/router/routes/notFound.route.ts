export default {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/404/NotFoundView.vue'),
    meta: {
        title: '404',
    },
};
