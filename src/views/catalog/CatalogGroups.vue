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

    <catalog-table
        :loading="isLoading"
        :headers="headers"
        :items="items"
        @edit="handleEdit"
        @delete="handleDelete"
    />

    <!--  Dialogs   -->
    <teleport to="body">
        <full-screen-dialog v-model="isDialogOpen" title="Create new group">
            <create-group-form />
        </full-screen-dialog>

        <full-screen-dialog
            v-model="isEditOpen"
            :title="`Edit - ${selectedGroup?.name}`"
        >
            <create-group-form v-model:group="selectedGroup" />
        </full-screen-dialog>

        <delete-dialog v-model="isDeleteOpen" :title="selectedGroup?.name" />
    </teleport>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import CatalogTable from '@/components/base/CatalogTable.vue';
    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateGroupForm from '@/components/forms/CreateGroupForm.vue';

    import { getGroups } from '@/api/catalog/get-groups.api.ts';
    import type { CatalogItem, Group } from '@/ts/catalog';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const isLoading = ref(true);
    const selectedGroup = ref<Group | null>(null);

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
            key: 'category.name',
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

    const items = ref<Group[]>([]);

    const handleEdit = (group: CatalogItem) => {
        selectedGroup.value = group as Group;

        isEditOpen.value = true;
    };

    const handleDelete = (group: CatalogItem) => {
        selectedGroup.value = group as Group;

        isDeleteOpen.value = true;
    };

    onMounted(async () => {
        try {
            items.value = (await getGroups()) ?? [];
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped></style>
