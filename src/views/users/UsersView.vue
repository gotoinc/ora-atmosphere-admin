<template>
    <section>
        <div class="mb-5 flex flex-wrap items-center justify-between gap-6">
            <h1 class="text-2xl font-bold">Users</h1>

            <v-btn
                class="text-none"
                append-icon="mdi-plus"
                color="primary"
                @click="isDialogOpen = true"
            >
                Add new admin
            </v-btn>
        </div>

        <v-tabs v-model="tab" class="mb-5 border-b border-white">
            <v-tab
                :to="{ name: 'regularUsersView' }"
                rounded
                class="text-none"
                color="white"
                :value="1"
            >
                All users
            </v-tab>

            <v-tab
                :to="{ name: 'adminsView' }"
                rounded
                class="text-none"
                color="white"
                :value="2"
            >
                Admins
            </v-tab>
        </v-tabs>

        <full-screen-dialog v-model="isDialogOpen" title="Create new user">
            <create-user-form
                @update="updateUsers"
                @close="isDialogOpen = false"
            />
        </full-screen-dialog>

        <router-view></router-view>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateUserForm from '@/components/forms/CreateUserForm.vue';

    import { useUsersStore } from '@/stores/users.store.ts';

    const tab = ref(1);

    const route = useRoute();

    const { loadAdmins, loadRegularUsers } = useUsersStore();

    const isDialogOpen = ref(false);

    const updateUsers = async () => {
        if (route.name === 'regularUsersView') {
            await loadRegularUsers();
        } else if (route.name === 'adminsView') {
            await loadAdmins();
        }
    };
</script>

<style scoped></style>
