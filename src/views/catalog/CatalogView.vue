<template>
    <section>
        <h1 class="mb-5 text-2xl font-bold">Catalog</h1>

        <v-tabs v-model="tab" class="mb-5 border-b border-white">
            <v-tab
                :to="{ name: 'categoriesView' }"
                rounded
                class="text-none"
                color="white"
                :value="1"
            >
                Categories
            </v-tab>

            <v-tab
                :to="{ name: 'groupsView' }"
                rounded
                class="text-none"
                color="white"
                :value="2"
            >
                Groups
            </v-tab>

            <v-tab
                :to="{ name: 'themesView' }"
                rounded
                class="text-none"
                color="white"
                :value="3"
            >
                Themes
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
