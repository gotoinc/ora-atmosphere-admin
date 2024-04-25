<template>
    <v-app>
        <v-layout>
            <!-- Header for tablets -->
            <v-app-bar v-if="!lgAndUp" color="primary" prominent>
                <v-burger
                    v-model="toggleSidebar"
                    @click="toggleSidebar = !toggleSidebar"
                />

                <v-spacer></v-spacer>

                <div v-if="!lgAndUp" class="pr-5">
                    <main-logo />
                </div>
            </v-app-bar>

            <!-- Sidebar -->
            <main-sidebar v-model="toggleSidebar" />

            <!-- Main view -->
            <v-main>
                <div class="pl-10 pt-10">
                    <router-view></router-view>
                </div>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useDisplay } from 'vuetify';

    const { lgAndUp } = useDisplay();

    import MainLogo from '@/components/base/MainLogo.vue';
    import VBurger from '@/components/base/VBurger.vue';
    import MainSidebar from '@/components/MainSidebar.vue';

    const toggleSidebar = ref(true);
</script>

<style scoped></style>
