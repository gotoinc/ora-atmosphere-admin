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
            Add new category
        </v-btn>
    </div>

    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
        <template #[`item.actions`]>
            <v-icon class="me-2" size="small"> mdi-pencil </v-icon>

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
            title: 'Category',
            align: 'start',
            key: 'name',
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
            name: 'Brands & events',
            contents: 10,
            date: new Date().toDateString(),
        },
        {
            name: 'Science',
            contents: 5,
            date: new Date().toDateString(),
        },
        {
            name: 'Culture',
            contents: 5,
            date: new Date().toDateString(),
        },
    ];
</script>

<style scoped></style>
