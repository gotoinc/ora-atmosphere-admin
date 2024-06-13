<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
        <template #[`item.actions`]="{ item }">
            <action-buttons @delete="item" @edit="item" />
        </template>

        <template #no-data>
            <v-btn color="primary"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import ActionButtons from '@/components/tables/TableActionButtons.vue';

    import type { ReadonlyHeaders } from '@/ts/vuetify';

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
            activity: 'Museums and Foundations',
        },
        {
            first_name: 'Jane',
            last_name: 'Smith',
            company_name: 'Innovatech',
            email: 'jane.smith@example.com',
            activity: 'Museums and Foundations',
        },
        {
            first_name: 'Alice',
            last_name: 'Johnson',
            company_name: 'Creative Works',
            email: 'alice.johnson@example.com',
            activity: 'Museums and Foundations',
        },
        {
            first_name: 'Bob',
            last_name: 'Brown',
            company_name: 'Business Corp',
            email: 'bob.brown@example.com',
            activity: 'Museums and Foundations',
        },
        {
            first_name: 'Carol',
            last_name: 'Davis',
            company_name: 'Future Innovations',
            email: 'carol.davis@example.com',
            activity: 'Museums and Foundations',
        },
    ];
</script>

<style scoped></style>
