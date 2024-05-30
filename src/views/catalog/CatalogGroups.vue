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
            Add new group
        </v-btn>
    </div>

    <catalog-table :headers="headers" :items="items" />

    <full-screen-dialog v-model="isDialogOpen" title="Create new group">
        <create-group-form />
    </full-screen-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateGroupForm from '@/components/forms/CreateGroupForm.vue';

    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isDialogOpen = ref(false);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Group',
            align: 'start',
            key: 'name',
        },
        {
            title: 'Image',
            key: 'image',
            sortable: false,
        },
        {
            title: 'Category',
            key: 'category',
        },
        {
            title: 'Contents amount',
            key: 'contents',
        },
        {
            title: 'Date',
            key: 'date',
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
            name: 'Brands',
            contents: 5,
            category: 'Brands & events',
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
        },
        {
            name: 'Events',
            contents: 5,
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
            category: 'Brands & events',
        },
        {
            name: 'Climate',
            contents: 5,
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
            category: 'Science',
        },
        {
            name: 'Biodiversity',
            contents: 5,
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
            category: 'Science',
        },
        {
            name: 'Space',
            contents: 2,
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
            category: 'Science',
        },
    ];
</script>

<style scoped></style>
