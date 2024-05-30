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
            Add new group
        </v-btn>
    </div>

    <catalog-table :headers="headers" :items="items" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';

    const headers = ref([
        {
            title: 'Group',
            align: 'start',
            key: 'name',
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
        },
        {
            name: 'Events',
            contents: 5,
            date: new Date().toDateString(),
            category: 'Brands & events',
        },
        {
            name: 'Climate',
            contents: 5,
            date: new Date().toDateString(),
            category: 'Science',
        },
        {
            name: 'Biodiversity',
            contents: 5,
            date: new Date().toDateString(),
            category: 'Science',
        },
        {
            name: 'Space',
            contents: 2,
            date: new Date().toDateString(),
            category: 'Science',
        },
    ];
</script>

<style scoped></style>
