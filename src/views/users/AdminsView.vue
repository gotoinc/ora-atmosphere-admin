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
        <v-dialog v-model="isEditOpen" max-width="768">
            <create-user-form
                :admin="selectedUser as AdminUser"
                @close="isEditOpen = false"
            />
        </v-dialog>

        <delete-dialog v-model="isDeleteOpen" :title="selectedUser?.company" />
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import CreateUserForm from '@/components/forms/CreateUserForm.vue';
    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import type { AdminUser } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const selectedUser = ref<AdminUser | null>(null);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Company name',
            align: 'start',
            key: 'company',
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
            email: 'admin1@example.com',
            company: 'Tech Solutions',
            role: 'admin' as const,
        },
        {
            email: 'superadmin1@example.com',
            company: 'Innovatech',
            role: 'super admin' as const,
        },
        {
            email: 'admin2@example.com',
            company: 'Creative Works',
            role: 'admin' as const,
        },
        {
            email: 'superadmin2@example.com',
            company: 'Business Corp',
            role: 'super admin' as const,
        },
        {
            email: 'admin3@example.com',
            company: 'Future Innovations',
            role: 'admin' as const,
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
