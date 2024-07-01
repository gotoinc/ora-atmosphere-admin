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
        :loading="isLoading"
        @edit="handleEdit"
        @delete="handleDelete"
    />

    <!--  Dialogs   -->
    <teleport to="body">
        <full-screen-dialog v-model="isDialogOpen" title="Create new theme">
            <create-theme-form
                @close="isDialogOpen = false"
                @update="loadTopics"
            />
        </full-screen-dialog>

        <full-screen-dialog
            v-model="isEditOpen"
            :title="`Edit - ${selectedTopic?.name}`"
        >
            <create-theme-form
                v-model:topic="selectedTopic"
                @close="isEditOpen = false"
                @update="loadTopics"
            />
        </full-screen-dialog>

        <delete-dialog
            v-model="isDeleteOpen"
            :loading="isDeleteLoading"
            :title="selectedTopic?.name"
            @delete="confirmDelete"
        />
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateThemeForm from '@/components/forms/CreateThemeForm.vue';

    import { deleteTopic } from '@/api/catalog/topics/delete-topic.api.ts';
    import { getTopics } from '@/api/catalog/topics/get-topics.api.ts';
    import type { CatalogItem, Topic } from '@/ts/catalog';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const toast = useToast();

    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);

    const isLoading = ref(true);
    const isDeleteLoading = ref(false);

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
            title: 'Visible for all',
            key: 'requires_auth',
        },
        {
            align: 'end',
            title: 'Actions',
            key: 'actions',
            sortable: false,
        },
    ]);

    const items = ref<Topic[]>([]);

    const handleEdit = (topic: CatalogItem) => {
        selectedTopic.value = topic as Topic;

        isEditOpen.value = true;
    };

    const handleDelete = (topic: CatalogItem) => {
        selectedTopic.value = topic as Topic;

        isDeleteOpen.value = true;
    };

    const confirmDelete = async () => {
        const topic = selectedTopic.value as Topic;

        isDeleteLoading.value = true;

        try {
            await deleteTopic(topic.id);

            toast.success('Theme successfully deleted');

            isDeleteOpen.value = false;

            void loadTopics();
        } catch (e) {
            toast.error('Theme is not deleted');
        } finally {
            isLoading.value = false;
            isDeleteLoading.value = false;
        }
    };

    const loadTopics = async () => {
        isLoading.value = true;

        try {
            items.value = (await getTopics()) ?? [];
        } finally {
            isLoading.value = false;
        }
    };

    void loadTopics();
</script>

<style scoped></style>
