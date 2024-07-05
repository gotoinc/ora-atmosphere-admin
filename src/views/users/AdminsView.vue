<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
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
                :admin="selectedUser as AdminUser"
                @close="isEditOpen = false"
            />
        </full-screen-dialog>

        <delete-dialog v-model="isDeleteOpen" :title="selectedUser?.company" />
    </teleport>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateUserForm from '@/components/forms/CreateUserForm.vue';
    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import type { AdminUser } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const selectedUser = ref<AdminUser | null>(null);

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

    const items = [
        {
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'admin1@example.com',
            company_name: 'Tech Solutions',
            role: 'admin',
        },
        {
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'superadmin1@example.com',
            company_name: 'Innovatech',
            role: 'super admin',
        },
        {
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'admin2@example.com',
            company_name: 'Creative Works',
            role: 'admin',
        },
        {
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'superadmin2@example.com',
            company_name: 'Business Corp',
            role: 'super admin',
        },
        {
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'admin3@example.com',
            company_name: 'Future Innovations',
            role: 'admin',
        },
    ];

    const handleEdit = (user: AdminUser) => {
        selectedUser.value = user;

        isEditOpen.value = true;
    };

    const handleDelete = (user: AdminUser) => {
        selectedUser.value = user;

        isDeleteOpen.value = true;
    };
</script>

<style scoped></style>
