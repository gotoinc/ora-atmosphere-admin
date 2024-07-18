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
            class="mb-10 flex flex-wrap items-center gap-4 max-mob-md:flex-col"
        >
            <v-text-field
                v-model.trim="filters.search"
                append-inner-icon="mdi-magnify"
                density="compact"
                label="Search..."
                variant="outlined"
                hide-details
                single-line
                class="w-full max-w-96 max-mob-md:max-w-full"
            ></v-text-field>

            <template v-if="false">
                <!-- TODO: filters for group ann category  -->
                <v-select
                    v-if="filters.category"
                    v-model="filters.category"
                    :loading="isTopicsLoading"
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
                    v-if="filters.group"
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
            </template>

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
                class="w-full max-w-96 max-mob-md:max-w-full"
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
        :loading="isLoading"
        :items="contents"
        :search="filters.search"
        editable
        @delete="handleDelete"
        @edit="handleEdit"
    />

    <!--  Dialogs   -->
    <teleport to="body">
        <full-screen-dialog v-model="isDialogOpen" title="Add new content">
            <create-content-form
                :topics="topics"
                @close="isDialogOpen = false"
                @update="loadContents"
            />
        </full-screen-dialog>

        <full-screen-dialog
            v-model="isEditOpen"
            :title="`Edit - ${selectedContent?.title}`"
        >
            <create-content-form
                v-model:content="selectedContent"
                :topics="topics"
                @close="isEditOpen = false"
                @update="loadContents"
            />
        </full-screen-dialog>

        <delete-dialog
            v-model="isDeleteOpen"
            :title="selectedContent?.title"
            @delete="confirmDelete"
        />
    </teleport>
</template>

<script setup lang="ts">
    import { computed, onMounted, reactive, ref, watch } from 'vue';
    import type { RouteLocationNormalizedGeneric } from 'vue-router';
    import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateContentForm from '@/components/forms/CreateContentForm.vue';
    import ContentsTable from '@/components/tables/ContentsTable.vue';

    import { getTopics } from '@/api/catalog/topics/get-topics.api.ts';
    import { deleteContent } from '@/api/contents/delete-content.api.ts';
    import { getContents } from '@/api/contents/get-contents.api.ts';
    import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams.ts';
    import type { Identifiable } from '@/ts/common';
    import type { VideoContent } from '@/ts/contents';

    interface Filters {
        search: string;
        category: Identifiable | null;
        group: Identifiable | null;
        topic: Identifiable | null;
    }

    const router = useRouter();
    const route = useRoute();

    const toast = useToast();

    const selectedContent = ref<VideoContent | null>(null);

    const isLoading = ref(false);
    const isDeleteLoading = ref(false);
    const isTopicsLoading = ref(false);
    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);

    const contents = ref<VideoContent[]>([]);
    const initialContents = ref<VideoContent[]>([]);

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

    const topics = ref<Identifiable[]>([]);

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

    const loadContents = async () => {
        isLoading.value = true;

        try {
            const items = (await getContents()) ?? [];

            initialContents.value = items;
            contents.value = items;
        } finally {
            isLoading.value = false;
        }
    };

    const loadTopics = async () => {
        isTopicsLoading.value = true;

        try {
            const items = (await getTopics()) ?? [];

            if (items.length > 0) {
                topics.value = items.map((item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                });
            }
        } finally {
            isTopicsLoading.value = false;
        }
    };

    const confirmDelete = async () => {
        const content = selectedContent.value as VideoContent;

        isDeleteLoading.value = true;

        try {
            await deleteContent(content.id);

            toast.success('Content successfully deleted');

            isDeleteOpen.value = false;

            void loadContents();
        } catch (e) {
            toast.error('Content is not deleted');
        } finally {
            isLoading.value = false;
            isDeleteLoading.value = false;
        }
    };

    const handleSearch = (route: RouteLocationNormalizedGeneric) => {
        const { topic } = route.query;

        if (topic) {
            contents.value = initialContents.value.filter(
                (content) => content.topic.id === Number(topic)
            );
        } else {
            contents.value = initialContents.value;
        }
    };

    onBeforeRouteUpdate((to) => {
        handleSearch(to);
    });

    onMounted(async () => {
        // Get topics
        await loadTopics();

        // Filters
        const { search, topic } = route.query;

        if (search) filters.search = search as string;

        // if (category)
        //     filters.category =
        //         topics.value.find((item) => item.name === category) ?? null;
        //
        // if (group)
        //     filters.group =
        //         topics.value.find((item) => item.name === group) ?? null;

        if (topic) {
            filters.topic =
                topics.value.find((item) => item.id === Number(topic)) ?? null;
        }

        // Get contents
        await loadContents();

        handleSearch(route);
    });

    watch(filters, useUpdateQueryParams, { deep: true });
</script>

<style scoped></style>
