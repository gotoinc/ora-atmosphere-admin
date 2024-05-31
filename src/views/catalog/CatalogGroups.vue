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
        <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

        <form class="grid gap-2" @submit.prevent>
            <fieldset>
                <p class="mb-3">Please enter a group name</p>

                <v-text-field
                    v-model="name"
                    name="name"
                    label="Group name"
                    type="name"
                    variant="outlined"
                />
            </fieldset>

            <fieldset>
                <p class="mb-3">Please select parent category</p>

                <v-select
                    v-model="categoryParent"
                    label="Category"
                    variant="outlined"
                    clearable
                    :items="['Brands & events', 'Science', 'Culture']"
                />
            </fieldset>

            <fieldset>
                <p class="mb-3">Please choose a file of background</p>

                <drag-and-drop @upload="(value) => console.log(value)" />
            </fieldset>

            <v-btn color="primary" class="text-none w-fit"> Save </v-btn>
        </form>
    </full-screen-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isDialogOpen = ref(false);
    const name = ref('');
    const categoryParent = ref();

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
