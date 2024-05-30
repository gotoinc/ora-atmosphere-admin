<template>
    <v-app>
        <v-layout>
            <!-- Header for tablets -->
            <main-header v-model="toggleSidebar" />

            <!-- Sidebar -->
            <main-sidebar v-model="toggleSidebar" />

            <!-- Main view -->
            <v-main>
                <div class="container py-10">
                    <router-view></router-view>
                </div>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useDisplay } from 'vuetify';

    import MainHeader from '@/components/layout/MainHeader.vue';
    import MainSidebar from '@/components/MainSidebar.vue';

    const { lgAndUp } = useDisplay();

    const toggleSidebar = ref(lgAndUp.value);
</script>

<style scoped></style>
