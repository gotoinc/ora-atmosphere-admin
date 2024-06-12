<template>
    <div class="mb-5 flex items-center gap-4 max-sm:flex-col">
        <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search..."
            variant="outlined"
            hide-details
            single-line
            class="max-w-96 max-sm:w-full max-sm:max-w-full"
        ></v-text-field>

        <v-btn
            class="text-none max-sm:w-full"
            append-icon="mdi-plus"
            color="primary"
            @click="isDialogOpen = true"
        >
            Add new theme
        </v-btn>
    </div>

    <catalog-table :headers="headers" :items="items" />

    <full-screen-dialog v-model="isDialogOpen" title="Create new theme">
        <create-theme-form />
    </full-screen-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateThemeForm from '@/components/forms/CreateThemeForm.vue';

    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isDialogOpen = ref(false);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Theme',
            align: 'start',
            key: 'name',
        },
        {
            title: 'Image',
            key: 'image',
            sortable: false,
        },
        {
            title: 'Group',
            key: 'group.name',
        },
        {
            title: 'Contents amount',
            key: 'contents_amount',
        },
        {
            title: 'Date',
            key: 'date_created',
        },
        {
            align: 'end',
            title: 'Actions',
            key: 'actions',
            sortable: false,
        },
    ]);

    const items = [
        {
            name: 'Theme 1',
            contents_amount: 5,
            group: {
                id: 1,
                name: 'Brands',
                image: '/public/images/example.jpg',
                category: {
                    id: 2,
                    name: 'Science',
                    image: '/public/images/example.jpg',
                    requires_auth: false,
                    contents_amount: 23,
                    groups: [],
                    date_created: new Date().toDateString(),
                },
                requires_auth: false,
                contents_amount: 10,
                topics: [],
                date_created: new Date().toDateString(),
            },
            date_created: new Date().toDateString(),
            image: '/public/images/example.jpg',
        },
        {
            name: 'Theme 2',
            contents_amount: 5,
            date_created: new Date().toDateString(),
            image: '/public/images/example.jpg',
            group: {
                id: 1,
                name: 'Brands',
                image: '/public/images/example.jpg',
                category: {
                    id: 2,
                    name: 'Science',
                    image: '/public/images/example.jpg',
                    requires_auth: false,
                    contents_amount: 23,
                    groups: [],
                    date_created: new Date().toDateString(),
                },
                requires_auth: false,
                contents_amount: 10,
                topics: [],
                date_created: new Date().toDateString(),
            },
        },
        {
            name: 'Theme 3',
            contents_amount: 5,
            date_created: new Date().toDateString(),
            image: '/public/images/example.jpg',
            group: {
                id: 1,
                name: 'Brands',
                image: '/public/images/example.jpg',
                category: {
                    id: 2,
                    name: 'Science',
                    image: '/public/images/example.jpg',
                    requires_auth: false,
                    contents_amount: 23,
                    groups: [],
                    date_created: new Date().toDateString(),
                },
                requires_auth: false,
                contents_amount: 10,
                topics: [],
                date_created: new Date().toDateString(),
            },
        },
        {
            name: 'Theme 4',
            contents_amount: 5,
            date_created: new Date().toDateString(),
            image: '/public/images/example.jpg',
            category: 'Science',
            group: {
                id: 1,
                name: 'Brands',
                image: '/public/images/example.jpg',
                category: {
                    id: 2,
                    name: 'Science',
                    image: '/public/images/example.jpg',
                    requires_auth: false,
                    contents_amount: 23,
                    groups: [],
                    date_created: new Date().toDateString(),
                },
                requires_auth: false,
                contents_amount: 10,
                topics: [],
                date_created: new Date().toDateString(),
            },
        },
        {
            name: 'Theme 5',
            contents_amount: 2,
            date_created: new Date().toDateString(),
            image: '/public/images/example.jpg',
            category: 'Science',
            group: {
                id: 1,
                name: 'Brands',
                image: '/public/images/example.jpg',
                category: {
                    id: 2,
                    name: 'Science',
                    image: '/public/images/example.jpg',
                    requires_auth: false,
                    contents_amount: 23,
                    groups: [],
                    date_created: new Date().toDateString(),
                },
                requires_auth: false,
                contents_amount: 10,
                topics: [],
                date_created: new Date().toDateString(),
            },
        },
    ];
</script>

<style scoped></style>
