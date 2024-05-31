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

    <v-dialog
        v-model="isDialogOpen"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <v-card>
            <v-toolbar class="mb-5" color="primary">
                <div class="container flex items-center">
                    <v-toolbar-title>Create new category</v-toolbar-title>

                    <v-btn
                        icon="mdi-close"
                        @click="isDialogOpen = false"
                    ></v-btn>
                </div>
            </v-toolbar>

            <div class="container">
                <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

                <form @submit.prevent>
                    <p class="mb-3">Please enter a category name</p>

                    <v-text-field
                        v-model="name"
                        name="name"
                        label="Category name"
                        type="name"
                        variant="outlined"
                        class="mb-2"
                    />

                    <p class="mb-3">Please choose a file of background</p>

                    <drag-and-drop @upload="(value) => console.log(value)" />

                    <v-btn color="primary text-none"> Save </v-btn>
                </form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    const isDialogOpen = ref(false);
    const name = ref('');

    const headers = ref([
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
            image: '/public/images/example.jpg',
        },
        {
            name: 'Science',
            contents: 5,
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
        },
        {
            name: 'Culture',
            contents: 5,
            date: new Date().toDateString(),
            image: '/public/images/example.jpg',
        },
    ];
</script>

<style scoped lang="postcss"></style>
