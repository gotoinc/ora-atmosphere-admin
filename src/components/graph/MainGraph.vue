<template>
    <bar-chart :chart-data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { BarChart } from 'vue-chart-3';
    import type { ChartData } from 'chart.js';
    import { Chart, registerables } from 'chart.js';

    // eslint-disable-next-line no-restricted-imports
    import tailwindConfig from '../../../tailwind.config.ts';

    Chart.register(...registerables);

    interface Props {
        data: ChartData<'bar'>;
        title?: string;
    }

    const props = defineProps<Props>();

    const chartData = computed(() => {
        const dataset = props.data.datasets.map((item) => {
            item.backgroundColor =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                tailwindConfig.theme.extend.colors.primary['100'];

            return item;
        });

        return {
            ...props.data,
            dataset,
        };
    });

    // Chart options
    const chartOptions = {
        layout: {
            padding: {
                top: 20,
            },
        },

        animations: {
            tension: {
                duration: 8000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true,
            },
        },

        scales: {
            x: {
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },

                padding: 10,

                ticks: {
                    font: {
                        family: 'Mulish',
                    },
                    color: '#f4effe',
                },
            },
            y: {
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },

                padding: 10,
                beginAtZero: true,

                ticks: {
                    font: {
                        family: 'Mulish',
                    },

                    color: '#f4effe',
                },
            },
        },

        plugins: {
            tooltip: {
                cornerRadius: 8,
                padding: 10,
                displayColors: false,

                titleFont: {
                    family: 'Mulish',
                },

                bodyFont: {
                    family: 'Mulish',
                },

                titleColor: '#f4effe',
                backgroundColor: '#080211',
            },

            legend: {
                display: false,

                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Mulish',
                    },
                    color: '#f4effe',
                },
            },

            title: {
                display: !!props.title,
                text: props.title,
            },
        },
    };
</script>

<style scoped></style>
