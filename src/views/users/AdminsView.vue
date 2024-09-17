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
        :loading="isLoading"
        :search="search"
        class="!rounded-lg"
        :headers="headers"
        :items="admins"
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

    <teleport to="body">
        <full-screen-dialog v-model="isEditOpen" :title="`Edit - ${userName}`">
            <create-user-form
                :admin="selectedUser as UserProfile"
                @close="isEditOpen = false"
                @update="usersStore.loadAdmins"
            />
        </full-screen-dialog>

        <delete-dialog
            v-model="isDeleteOpen"
            :title="selectedUser?.first_name"
            :loading="isDeleteLoading"
            @delete="confirmDelete"
        />
    </teleport>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateUserForm from '@/components/forms/CreateUserForm.vue';
    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';
    import { useUsersStore } from '@/stores/users.store.ts';

    import { deleteAdmin } from '@/api/users/delete-admin.api.ts';
    import type { UserProfile } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const toast = useToast();

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const isDeleteLoading = ref(false);
    const selectedUser = ref<UserProfile | null>(null);

    const search = ref('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profile } = storeToRefs(useAuthStore());

    const usersStore = useUsersStore();
    const { admins, isLoading } = storeToRefs(usersStore);

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
        // {
        //     title: 'Company name',
        //     align: 'start',
        //     key: 'company_name',
        // },
        {
            title: 'Email',
            key: 'email',
        },
        // {
        //     title: 'Role',
        //     key: 'role',
        // },
        {
            title: 'Actions',
            key: 'actions',
            align: 'end',
            sortable: false,
        },
    ]);

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
            await deleteAdmin(user.id);

            toast.success('User successfully deleted');

            isDeleteOpen.value = false;

            void usersStore.loadAdmins();
        } catch (e) {
            toast.error('User was not deleted');
        } finally {
            isLoading.value = false;
            isDeleteLoading.value = false;
        }
    };

    void usersStore.loadAdmins();
</script>

<style scoped></style>
