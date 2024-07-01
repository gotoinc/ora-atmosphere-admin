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
            `Brands & events id:1`,
            'Science id:2',
            'Culture id:3',
            'Our World id:4',
            'Entertainment id:5',
            'Oceans & Skies id:6',
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
            'Brands id:1',
            'Events id:2',
            'Climate id:3',
            'Biodiversity id:4',
            'Space id:5',
            'Geology id:6',
            'The Future id:7',
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
            'Theme 1 id:1',
            'Theme 2 id:2',
            'Theme 3 id:3',
            'Theme 4 id:4',
            'Theme 5 id:5',
            'Theme 6 id:6',
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
