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
            <create-group-form
                @close="isDialogOpen = false"
                @update="loadGroups"
            />
        </full-screen-dialog>

        <full-screen-dialog
            v-model="isEditOpen"
            :title="`Edit - ${selectedGroup?.name}`"
        >
            <create-group-form
                v-model:group="selectedGroup"
                @close="isEditOpen = false"
                @update="loadGroups"
            />
        </full-screen-dialog>

        <delete-dialog
            v-model="isDeleteOpen"
            :title="selectedGroup?.name"
            :loading="isDeleteLoading"
            @delete="confirmDelete"
        />
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateGroupForm from '@/components/forms/CreateGroupForm.vue';
    import CatalogTable from '@/components/tables/CatalogTable.vue';

    import { deleteGroup } from '@/api/catalog/groups/delete-group.api.ts';
    import { getGroups } from '@/api/catalog/groups/get-groups.api.ts';
    import type { CatalogItem, Group } from '@/ts/catalog';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const toast = useToast();

    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);

    const isLoading = ref(true);
    const isDeleteLoading = ref(false);

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
            align: 'center',
        },
        // {
        //     title: 'Category',
        //     key: 'category.name',
        // },
        // {
        //     title: 'Contents amount',
        //     key: 'contentsAmount',
        // },
        {
            title: 'Date',
            key: 'date_created',
        },
        {
            title: 'Visible for all',
            key: 'requires_auth',
            align: 'center',
            sortable: false,
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

    const confirmDelete = async () => {
        const group = selectedGroup.value as Group;

        isDeleteLoading.value = true;

        try {
            await deleteGroup(group.id);

            toast.success('Group successfully deleted');

            isDeleteOpen.value = false;

            void loadGroups();
        } catch (e) {
            toast.error('Group is not deleted');
        } finally {
            isLoading.value = false;
            isDeleteLoading.value = false;
        }
    };

    const loadGroups = async () => {
        isLoading.value = true;

        try {
            const groups = (await getGroups()) ?? [];
            items.value = [...groups].reverse();
        } finally {
            isLoading.value = false;
        }
    };

    void loadGroups();
</script>

<style scoped></style>
