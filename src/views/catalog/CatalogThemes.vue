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

    <catalog-table
        :headers="headers"
        :items="items"
        @edit="handleEdit"
        @delete="handleDelete"
    />

    <!--  Dialogs   -->
    <teleport to="body">
        <full-screen-dialog v-model="isDialogOpen" title="Create new theme">
            <create-theme-form />
        </full-screen-dialog>

        <full-screen-dialog
            v-model="isEditOpen"
            :title="`Edit - ${selectedTopic?.name}`"
        >
            <create-theme-form v-model:topic="selectedTopic" />
        </full-screen-dialog>

        <delete-dialog v-model="isDeleteOpen" :title="selectedTopic?.name" />
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateThemeForm from '@/components/forms/CreateThemeForm.vue';

    import type { CatalogItem, Topic } from '@/ts/catalog';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const selectedTopic = ref<Topic | null>(null);

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
            },
        },
    ];

    const handleEdit = (topic: CatalogItem) => {
        selectedTopic.value = topic as Topic;

        isEditOpen.value = true;
    };

    const handleDelete = (topic: CatalogItem) => {
        selectedTopic.value = topic as Topic;

        isDeleteOpen.value = true;
    };
</script>

<style scoped></style>
