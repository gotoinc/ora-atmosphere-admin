<template>
    <h1 class="mb-5 text-2xl font-bold">Contents</h1>

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
            Add new content
        </v-btn>
    </div>

    <contents-table
        :headers="headers"
        :items="items"
        @delete="handleDelete"
        @edit="handleEdit"
    />

    <full-screen-dialog v-model="isDialogOpen" title="Add new content">
        <create-content-form />
    </full-screen-dialog>

    <full-screen-dialog
        v-model="isEditOpen"
        :title="`Edit - ${selectedContent?.title}`"
    >
        <create-content-form v-model:content="selectedContent" />
    </full-screen-dialog>

    <delete-dialog v-model="isDeleteOpen" :title="selectedContent?.title" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateContentForm from '@/components/forms/CreateContentForm.vue';
    import ContentsTable from '@/components/tables/ContentsTable.vue';

    import type { Content } from '@/ts/contents';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const selectedContent = ref<Content | null>(null);

    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Title',
            align: 'start',
            key: 'title',
        },
        {
            title: 'Preview',
            key: 'image_url',
            sortable: false,
        },
        {
            title: 'Theme',
            key: 'topic.name',
        },
        {
            title: 'Description',
            key: 'description',
        },
        {
            title: 'Duration',
            key: 'duration',
            sortable: false,
        },
        {
            title: 'Sound',
            key: 'with_sound',
            sortable: false,
        },
        {
            title: 'Narration',
            key: 'with_narration',
            sortable: false,
        },
        {
            title: 'Date',
            key: 'date_created',
        },
        {
            title: 'Languages',
            key: 'languages',
        },
        {
            title: 'Tags',
            key: 'tags',
        },
        {
            align: 'end',
            title: 'Actions',
            key: 'actions',
            sortable: false,
        },
    ]);

    const items: Content[] = [
        {
            id: 1000,
            file_url:
                'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4',
            image_url: '/images/example.jpg',
            title: 'Сisco',
            topic: {
                id: 100,
                name: 'Theme 1',
            },
            description:
                'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            languages: ['en', 'fr', 'de', 'es'],
            tags: ['environment', 'museum', 'luxury', 'art'],
            requires_auth: false,
            duration: 13,
            with_sound: true,
            with_narration: true,
            date_created: new Date().toISOString().split('T')[0],
        },
        {
            id: 1001,
            file_url:
                'https://videos.pexels.com/video-files/4114797/4114797-hd_1280_720_50fps.mp4',
            image_url: '/images/example.jpg',
            title: 'Сisco 2',
            topic: {
                id: 100,
                name: 'Theme 2',
            },
            description:
                'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            languages: ['en', 'fr', 'de', 'es'],
            tags: ['environment', 'museum', 'luxury', 'art'],
            requires_auth: true,
            duration: 13,
            with_sound: true,
            with_narration: true,
            date_created: new Date().toISOString().split('T')[0],
        },
    ];

    const handleEdit = (content: Content) => {
        selectedContent.value = content;

        isEditOpen.value = true;
    };

    const handleDelete = (content: Content) => {
        selectedContent.value = content;

        isDeleteOpen.value = true;
    };
</script>

<style scoped></style>
