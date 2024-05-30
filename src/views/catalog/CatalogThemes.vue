<template>
    <div class="mb-5 flex items-center gap-4">
        <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search..."
            variant="outlined"
            hide-details
            single-line
            class="max-w-96"
        ></v-text-field>

        <v-btn class="text-none" append-icon="mdi-plus" color="primary">
            Add new theme
        </v-btn>
    </div>

    <catalog-table :headers="headers" :items="items" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';

    const headers = ref([
        {
            title: 'Theme',
            align: 'start',
            key: 'name',
        },
        {
            title: 'Category',
            key: 'category',
        },
        {
            title: 'Group',
            key: 'group',
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
            name: 'Theme 1',
            contents: 5,
            category: 'Brands & events',
            group: 'Brands',
            date: new Date().toDateString(),
        },
        {
            name: 'Theme 2',
            contents: 5,
            date: new Date().toDateString(),
            category: 'Brands & events',
            group: 'Events',
        },
        {
            name: 'Theme 3',
            contents: 5,
            date: new Date().toDateString(),
            category: 'Science',
            group: 'Climate',
        },
        {
            name: 'Theme 4',
            contents: 5,
            date: new Date().toDateString(),
            category: 'Science',
            group: 'Biodiversity',
        },
        {
            name: 'Theme 5',
            contents: 2,
            date: new Date().toDateString(),
            category: 'Science',
            group: 'Space',
        },
    ];
</script>

<style scoped></style>
