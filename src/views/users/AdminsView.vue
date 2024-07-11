<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="users">
        <template #[`item.role`]="{ item }">
            <span class="capitalize">
                {{ item.role }}
            </span>
        </template>

        <template #[`item.actions`]="{ item }">
            <action-buttons
                @delete="handleDelete(item)"
                @edit="handleEdit(item)"
            />
        </template>

        <template #no-data>
            <v-btn color="primary"> Reset </v-btn>
        </template>
    </v-data-table>

    <teleport to="body">
        <full-screen-dialog v-model="isEditOpen" :title="`Edit - ${userName}`">
            <create-user-form
                :admin="selectedUser as UserProfile"
                @close="isEditOpen = false"
                @update="loadUsers"
            />
        </full-screen-dialog>

        <delete-dialog
            v-model="isDeleteOpen"
            :title="selectedUser?.company_name"
        />
    </teleport>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateUserForm from '@/components/forms/CreateUserForm.vue';
    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import { getAdminUsers } from '@/api/users/get-admin-users.api.ts';
    import type { UserProfile } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const isLoading = ref(false);
    const selectedUser = ref<UserProfile | null>(null);

    const userName = computed(
        () =>
            `${selectedUser.value?.first_name} ${selectedUser.value?.last_name}`
    );

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'First name',
            align: 'start',
            key: 'first_name',
        },
        {
            title: 'Last name',
            align: 'start',
            key: 'last_name',
        },
        {
            title: 'Company name',
            align: 'start',
            key: 'company_name',
        },
        {
            title: 'Email',
            key: 'email',
        },
        {
            title: 'Role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'end',
            sortable: false,
        },
    ]);

    const users = ref<UserProfile[]>([]);

    const handleEdit = (user: UserProfile) => {
        selectedUser.value = user;

        isEditOpen.value = true;
    };

    const handleDelete = (user: UserProfile) => {
        selectedUser.value = user;

        isDeleteOpen.value = true;
    };

    const loadUsers = async () => {
        isLoading.value = true;

        try {
            users.value = (await getAdminUsers()) ?? [];
        } finally {
            isLoading.value = false;
        }
    };

    void loadUsers();
</script>

<style scoped></style>
