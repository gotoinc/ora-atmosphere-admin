export default {
    path: '/catalog',
    name: 'catalogView',
    component: () => import('@/views/catalog/CatalogView.vue'),

    meta: { title: 'Categories' },

    redirect: { name: 'categoriesView' },

    children: [
        {
            path: 'categories',
            name: 'categoriesView',
            component: () => import('@/views/catalog/CatalogCategories.vue'),
        },
        {
            path: 'groups',
            name: 'groupsView',
            component: () => import('@/views/catalog/CatalogGroups.vue'),
        },
        {
            path: 'themes',
            name: 'themesView',
            component: () => import('@/views/catalog/CatalogThemes.vue'),
        },
    ],
};
