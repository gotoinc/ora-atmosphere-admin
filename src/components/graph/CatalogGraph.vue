<template>
    <div class="v-sheet--offset mx-auto w-full rounded bg-grey-200 p-5">
        <div class="mb-10 flex items-start justify-between">
            <h2 class="text-xl font-semibold">Catalog statistics</h2>

            <v-btn-toggle v-model="selectedGraphOption" color="primary">
                <v-btn class="text-none"> Categories </v-btn>

                <v-btn class="text-none"> Groups </v-btn>

                <v-btn class="text-none"> Themes </v-btn>
            </v-btn-toggle>
        </div>

        <div>
            <main-graph
                v-if="selectedGraphOption === 0"
                class="min-h-[350px]"
                :data="categoriesData"
            />

            <main-graph
                v-else-if="selectedGraphOption === 1"
                class="min-h-[350px]"
                :data="groupsData"
            />

            <main-graph v-else class="min-h-[350px]" :data="topicsData" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { ChartData } from 'chart.js';

    import MainGraph from '@/components/graph/MainGraph.vue';

    const selectedGraphOption = ref(0);

    // Categories
    const categoriesData = ref<ChartData<'bar'>>({
        labels: [
            'Brands & events',
            'Science',
            'Culture',
            'Our World',
            'Entertainment',
            'Oceans & Skies',
        ],

        datasets: [
            {
                data: [0, 1, 2, 2, 32, 4],
            },
        ],
    });

    // Groups
    const groupsData = ref<ChartData<'bar'>>({
        labels: [
            'Brands',
            'Events',
            'Climate',
            'Biodiversity',
            'Space',
            'Geology',
            'The Future',
        ],

        datasets: [
            {
                data: [4, 4, 6, 0, 9, 23, 5],
            },
        ],
    });

    // Themes
    const topicsData = ref<ChartData<'bar'>>({
        labels: [
            'Theme 1',
            'Theme 2',
            'Theme 3',
            'Theme 4',
            'Theme 5',
            'Theme 6',
        ],

        datasets: [
            {
                data: [20, 5, 6, 0, 12, 1],
            },
        ],
    });
</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
        max-width: calc(100% - 32px);
    }
</style>
