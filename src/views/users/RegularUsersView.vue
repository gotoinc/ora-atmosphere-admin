<template>
    <v-text-field
        v-model.trim="search"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search..."
        variant="outlined"
        hide-details
        single-line
        class="mb-5 max-w-96 max-sm:w-full max-sm:max-w-full"
    ></v-text-field>

    <v-data-table
        :search="search"
        :loading="isLoading"
        class="!rounded-lg"
        :headers="headers"
        :items="users"
    >
        <template #[`item.actions`]="{ item }">
            <action-buttons
                v-if="item.id !== profile?.id"
                @delete="handleDelete(item)"
                @edit="handleEdit(item)"
            />
        </template>

        <template #no-data>
            <p class="text-lg">No users found</p>
        </template>
    </v-data-table>

    <full-screen-dialog v-model="isEditOpen" :title="`Edit - ${userName}`">
        <edit-user-form
            :user="selectedUser as UserProfile"
            @close="isEditOpen = false"
            @update="loadUsers"
        />
    </full-screen-dialog>

    <delete-dialog
        v-model="isDeleteOpen"
        :title="userName"
        :loading="isDeleteLoading"
        @delete="confirmDelete"
    />
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import EditUserForm from '@/components/forms/EditUserForm.vue';
    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { deleteUser } from '@/api/users/delete-user.api.ts';
    import { getRegularUsers } from '@/api/users/get-regular-users.api.ts';
    import type { UserProfile } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const toast = useToast();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profile } = storeToRefs(useAuthStore());

    const userName = computed(
        () =>
            `${selectedUser.value?.first_name} ${selectedUser.value?.last_name}`
    );

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const isDeleteLoading = ref(false);
    const selectedUser = ref<UserProfile | null>(null);
    const isLoading = ref(false);

    const search = ref('');

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
        // {
        //     title: 'Company name',
        //     key: 'company_name',
        // },
        {
            title: 'Email',
            key: 'email',
            sortable: false,
        },
        // {
        //     title: 'Activity',
        //     key: 'activity',
        // },
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

    const confirmDelete = async () => {
        isDeleteLoading.value = true;

        const user = selectedUser.value as UserProfile;

        try {
            await deleteUser(user.id);

            toast.success('User successfully deleted');

            isDeleteOpen.value = false;

            void loadUsers();
        } catch (e) {
            toast.error('User is not deleted');
        } finally {
            isLoading.value = false;
            isDeleteLoading.value = false;
        }
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
