<template>
    <div
        :class="{ loading: isLoading }"
        class="v-sheet--offset mx-auto w-full rounded bg-grey-200 p-5"
    >
        <div class="mb-10 flex flex-wrap items-start justify-between gap-5">
            <h2 class="text-xl font-semibold">Contents statistics</h2>

            <v-btn-toggle
                v-if="false"
                v-model="selectedGraphOption"
                class="max-xs:!h-auto max-xs:w-full max-xs:flex-col"
                color="primary"
            >
                <v-btn class="tab"> Categories </v-btn>

                <v-btn class="tab"> Groups </v-btn>

                <v-btn class="tab"> Themes </v-btn>
            </v-btn-toggle>
        </div>

        <v-loader v-if="isLoading" />

        <div class="min-h-[350px] overflow-x-auto pb-5">
            <main-graph
                v-if="selectedGraphOption === 0"
                class="graph"
                :data="categoriesData"
            />

            <main-graph
                v-else-if="selectedGraphOption === 1"
                class="graph"
                :data="groupsData"
            />

            <main-graph v-else class="graph" :data="topicsData" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { ChartData } from 'chart.js';

    import MainGraph from '@/components/graph/MainGraph.vue';

    import { getTopics } from '@/api/catalog/topics/get-topics.api.ts';
    import VLoader from '@/App.vue';

    const selectedGraphOption = ref(3);
    const isLoading = ref(true);

    const chartInstance = {
        labels: [],
        datasets: [{ data: [] }],
    };

    // Categories
    const categoriesData = ref<ChartData<'bar'>>(chartInstance);

    // Groups
    const groupsData = ref<ChartData<'bar'>>(chartInstance);

    // Themes
    const topicsData = ref<ChartData<'bar'>>(chartInstance);

    const loadTopicsData = async () => {
        isLoading.value = true;

        try {
            const topics = (await getTopics()) ?? [];

            if (topics.length > 0) {
                topics.slice(0, 8).forEach((item) => {
                    topicsData.value.labels?.push(item.name);
                    topicsData.value.datasets[0].data.push(
                        item.contents_amount
                    );
                });
            }
        } finally {
            isLoading.value = false;
        }
    };

    void loadTopicsData();
</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
        max-width: calc(100% - 32px);

        &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgb(41 41 45 / 0.8);
            z-index: 10;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        &.loading {
            &:before {
                opacity: 1;
            }
        }
    }

    .v-sheet--offset {
        @apply max-mob:max-w-full;
    }

    .tab {
        @apply capitalize max-sm:min-h-12;
    }

    .graph {
        min-width: 685px;
    }
</style>
