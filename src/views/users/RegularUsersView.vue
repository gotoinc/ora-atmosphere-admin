<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
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

    import type { UserProfile } from '@/ts/users';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const userName = computed(
        () =>
            `${selectedUser.value?.first_name} ${selectedUser.value?.last_name}`
    );

    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const selectedUser = ref<UserProfile | null>(null);

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

    const items = [
        {
            first_name: 'John',
            last_name: 'Doe',
            company_name: 'Tech Solutions',
            email: 'john.doe@example.com',
            activity: 'Active',
            job_title: 'Software Engineer',
            company_website: 'https://www.techsolutions.com',
            phone_number: '1234567890',
        },
        {
            first_name: 'Jane',
            last_name: 'Smith',
            company_name: 'Innovatech',
            email: 'jane.smith@example.com',
            activity: 'Inactive',
            job_title: 'Product Manager',
            company_website: '',
            phone_number: '0987654321',
        },
        {
            first_name: 'Alice',
            last_name: 'Johnson',
            company_name: 'Creative Works',
            email: 'alice.johnson@example.com',
            activity: 'Active',
            job_title: 'Graphic Designer',
            company_website: '',
            phone_number: '',
        },
        {
            first_name: 'Bob',
            last_name: 'Brown',
            company_name: 'Business Corp',
            email: 'bob.brown@example.com',
            activity: 'Active',
            job_title: '',
            company_website: 'https://www.businesscorp.com',
            phone_number: '5559876543',
        },
        {
            first_name: 'Carol',
            last_name: 'Davis',
            company_name: 'Future Innovations',
            email: 'carol.davis@example.com',
            activity: 'Inactive',
            job_title: 'Chief Technology Officer',
            company_website: 'https://www.futureinnovations.com',
            phone_number: '1235557890',
        },
    ];

    const handleEdit = (user: UserProfile) => {
        selectedUser.value = user;

        isEditOpen.value = true;
    };

    const handleDelete = (user: UserProfile) => {
        selectedUser.value = user;

        isDeleteOpen.value = true;
    };
</script>

<style scoped></style>
