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

    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
        <template #[`item.actions`]>
            <v-icon class="mr-2" size="small"> mdi-pencil </v-icon>

            <v-icon size="small"> mdi-delete </v-icon>
        </template>

        <template #no-data>
            <v-btn color="primary"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

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
