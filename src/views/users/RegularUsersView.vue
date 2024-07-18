<template>
    <v-data-table
        :loading="isLoading"
        class="!rounded-lg"
        :headers="headers"
        :items="users"
    >
        <template #[`item.actions`]="{ item }">
            <action-buttons
                @delete="handleDelete(item)"
                @edit="handleEdit(item)"
            />
        </template>

        <template #no-data>
            <p class="text-lg">No users found</p>
        </template>
    </v-data-table>

    <full-screen-dialog v-model="isEditOpen" :title="`Edit - ${userName}`">
        <edit-user-form :user="selectedUser as UserProfile" />
    </full-screen-dialog>

    <delete-dialog v-model="isDeleteOpen" :title="userName" />
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import EditUserForm from '@/components/forms/EditUserForm.vue';
    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import { getRegularUsers } from '@/api/users/get-regular-users.api.ts';
    import type { UserProfile } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const userName = computed(
        () =>
            `${selectedUser.value?.first_name} ${selectedUser.value?.last_name}`
    );

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const selectedUser = ref<UserProfile | null>(null);
    const isLoading = ref(false);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'First name',
            align: 'start',
            key: 'first_name',
        },
        {
            title: 'Last name',
            key: 'last_name',
        },
        {
            title: 'Company name',
            key: 'company_name',
        },
        {
            title: 'Email',
            key: 'email',
            sortable: false,
        },
        {
            title: 'Activity',
            key: 'activity',
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
            users.value = (await getRegularUsers()) ?? [];
        } finally {
            isLoading.value = false;
        }
    };

    void loadUsers();
</script>

<style scoped></style>
