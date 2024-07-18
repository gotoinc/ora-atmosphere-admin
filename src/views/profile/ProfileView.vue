<template>
    <section>
        <div class="mb-5 flex flex-wrap items-center justify-between gap-6">
            <h1 class="text-2xl font-bold">Profile</h1>

            <template v-if="false">
                <!-- TODO: add deactivation -->
                <v-btn class="text-none" color="red">
                    Deactivate account
                </v-btn>
            </template>
        </div>

        <v-tabs v-model="tab" class="mb-6 border-b border-white">
            <v-tab
                :to="{ name: 'profileInfoView' }"
                rounded
                class="text-none"
                color="white"
                :value="1"
            >
                Personal information
            </v-tab>

            <v-tab
                :to="{ name: 'profilePasswordView' }"
                rounded
                class="text-none"
                color="white"
                :value="2"
            >
                Password
            </v-tab>
        </v-tabs>

        <router-view></router-view>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const tab = ref(1);
</script>

<style scoped></style>
