<template>
    <section>
        <div class="mb-5 flex flex-wrap items-center justify-between gap-6">
            <h1 class="text-2xl font-bold">Users</h1>

            <template v-if="false">
                <!-- TODO: add new admin -->
                <v-btn
                    class="text-none"
                    append-icon="mdi-plus"
                    color="primary"
                    @click="isDialogOpen = true"
                >
                    Add new admin
                </v-btn>
            </template>
        </div>

        <template v-if="false">
            <!-- TODO: split regular users and admins -->
            <v-tabs v-model="tab" class="mb-5 border-b border-white">
                <v-tab
                    :to="{ name: 'regularUsersView' }"
                    rounded
                    class="text-none"
                    color="white"
                    :value="1"
                >
                    Regular users
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
        </template>

        <full-screen-dialog v-model="isDialogOpen" title="Create new user">
            <create-user-form @close="isDialogOpen = false" />
        </full-screen-dialog>

        <router-view></router-view>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateUserForm from '@/components/forms/CreateUserForm.vue';

    const tab = ref(1);

    const isDialogOpen = ref(false);
</script>

<style scoped></style>
