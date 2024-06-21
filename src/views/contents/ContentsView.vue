<template>
    <div class="mb-5 flex flex-wrap items-center justify-between gap-6">
        <h1 class="text-2xl font-bold">Contents</h1>

        <v-btn
            class="text-none"
            append-icon="mdi-plus"
            color="primary"
            @click="isDialogOpen = true"
        >
            Add new content
        </v-btn>
    </div>

    <div class="relative">
        <form
            class="mb-10 grid grid-cols-4 items-center gap-4 max-tab:grid-cols-3 max-mob-lg:grid-cols-1"
        >
            <v-text-field
                v-model="filters.search"
                append-inner-icon="mdi-magnify"
                density="compact"
                label="Search..."
                variant="outlined"
                hide-details
                single-line
                class="max-w-96 max-tab:col-span-full max-tab:max-w-full"
            ></v-text-field>

            <v-select
                v-model="filters.category"
                label="Category"
                density="compact"
                variant="outlined"
                clearable
                hide-details
                :items="topics"
                item-title="name"
                return-object
            />

            <v-select
                v-model="filters.group"
                label="Group"
                density="compact"
                variant="outlined"
                clearable
                hide-details
                :items="topics"
                item-title="name"
                return-object
            />

            <v-select
                v-model="filters.topic"
                label="Theme"
                density="compact"
                variant="outlined"
                clearable
                hide-details
                :items="topics"
                item-title="name"
                return-object
            />
        </form>

        <button
            v-show="isResetShow"
            class="fade-b absolute top-full block w-fit translate-y-1 font-semibold transition-colors hover:text-primary-50"
            @click="resetFilters"
        >
            Reset filters
        </button>
    </div>

    <contents-table
        :headers="headers"
        :items="items"
        @delete="handleDelete"
        @edit="handleEdit"
    />

    <!--  Dialogs   -->
    <teleport to="body">
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
    </teleport>
</template>

<script setup lang="ts">
    import { computed, onMounted, reactive, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateContentForm from '@/components/forms/CreateContentForm.vue';
    import ContentsTable from '@/components/tables/ContentsTable.vue';

    import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams.ts';
    import type { Identifiable } from '@/ts/common';
    import type { VideoContent } from '@/ts/contents';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    interface Filters {
        search: string;
        category: Identifiable | null;
        group: Identifiable | null;
        topic: Identifiable | null;
    }

    const router = useRouter();
    const route = useRoute();

    const selectedContent = ref<VideoContent | null>(null);

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
            key: 'image',
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

    const items: VideoContent[] = [
        {
            id: 1000,
            file: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4',
            image: '/images/example.jpg',
            title: 'Сisco',
            topic: {
                id: 100,
                name: 'Theme 1',
            },
            description:
                'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            languages: [
                {
                    name: 'English',
                    id: 1,
                },
                {
                    name: 'Spanish',
                    id: 2,
                },
            ],
            tags: ['environment', 'museum', 'luxury', 'art'],
            requires_auth: false,
            duration: 13,
            with_sound: true,
            with_narration: true,
            date_created: new Date().toISOString().split('T')[0],
        },
        {
            id: 1001,
            file: 'https://videos.pexels.com/video-files/4114797/4114797-hd_1280_720_50fps.mp4',
            image: '/images/example.jpg',
            title: 'Сisco 2',
            topic: {
                id: 100,
                name: 'Theme 2',
            },
            description:
                'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            languages: [
                {
                    name: 'English',
                    id: 1,
                },
                {
                    name: 'Spanish',
                    id: 2,
                },
            ],
            tags: ['environment', 'museum', 'luxury', 'art'],
            requires_auth: true,
            duration: 13,
            with_sound: true,
            with_narration: true,
            date_created: new Date().toISOString().split('T')[0],
        },
    ];

    const isResetShow = computed(() =>
        [filters.search, filters.topic, filters.group, filters.category].some(
            (filter) => filter
        )
    );

    /**
     * Filters
     */
    const filters = reactive<Filters>({
        search: '',
        category: null,
        group: null,
        topic: null,
    });

    const topics = ref<Identifiable[]>([
        {
            id: 100,
            name: 'Theme 1',
        },
        {
            id: 101,
            name: 'Theme 2',
        },
    ]);

    const handleEdit = (content: VideoContent) => {
        selectedContent.value = content;

        isEditOpen.value = true;
    };

    const handleDelete = (content: VideoContent) => {
        selectedContent.value = content;

        isDeleteOpen.value = true;
    };

    const resetFilters = () => {
        filters.search = '';
        filters.category = null;
        filters.group = null;
        filters.topic = null;
        void router.push({ query: {} });
    };

    onMounted(() => {
        const { search, category, group, topic } = route.query;

        if (search) filters.search = search as string;

        if (category)
            filters.category =
                topics.value.find((item) => item.name === category) ?? null;

        if (group)
            filters.group =
                topics.value.find((item) => item.name === group) ?? null;

        if (topic)
            filters.topic =
                topics.value.find((item) => item.name === topic) ?? null;
    });

    watch(filters, useUpdateQueryParams, { deep: true });
</script>

<style scoped></style>
