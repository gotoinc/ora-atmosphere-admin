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
