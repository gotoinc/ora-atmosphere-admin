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
            Add new category
        </v-btn>
    </div>

    <catalog-table :headers="headers" :items="items" />

    <full-screen-dialog v-model="isDialogOpen" title="Create new category">
        <create-category-form />
    </full-screen-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateCategoryForm from '@/components/forms/CreateCategoryForm.vue';

    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isDialogOpen = ref(false);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Category',
            align: 'start',
            key: 'name',
        },
        {
            title: 'Image',
            key: 'image',
            sortable: false,
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
            id: 1,
            name: 'Brands & events',
            image: '/public/images/example.jpg',
            requires_auth: false,
            contents_amount: 10,
            groups: [],
            date_created: new Date().toDateString(),
        },
        {
            id: 2,
            name: 'Science',
            image: '/public/images/example.jpg',
            requires_auth: false,
            contents_amount: 23,
            groups: [],
            date_created: new Date().toDateString(),
        },
        {
            id: 3,
            name: 'Culture',
            image: '/public/images/example.jpg',
            requires_auth: false,
            contents_amount: 12,
            groups: [],
            date_created: new Date().toDateString(),
        },
    ];
</script>

<style scoped lang="postcss"></style>
