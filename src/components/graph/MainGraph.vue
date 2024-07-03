<template>
    <bar-chart ref="chartRef" :chart-data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { BarChart } from 'vue-chart-3';
    import type { ChartData, ChartOptions } from 'chart.js';
    import { Chart, registerables } from 'chart.js';

    // eslint-disable-next-line no-restricted-imports
    import tailwindConfig from '../../../tailwind.config.ts';

    Chart.register(...registerables);

    interface Props {
        data: ChartData<'bar'>;
        title?: string;
    }

    const props = defineProps<Props>();

    // Get label name
    function splitLabel(label: string, separator: 0): string;
    // Get id of the label
    function splitLabel(label: string, separator: 1): number;
    function splitLabel(label: string, separator: 0 | 1): string | number {
        const value = label.split('id:')[separator];
        return separator === 0 ? value : Number(value);
    }

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
    const chartOptions: ChartOptions = {
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

                ticks: {
                    font: {
                        family: 'Mulish',
                    },
                    color: '#fff',

                    callback: function (val) {
                        return splitLabel(this.getLabelForValue(+val), 0);
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },

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

                callbacks: {
                    title(tooltipItems) {
                        return splitLabel(tooltipItems[0].label, 0);
                    },
                },
            },

            legend: {
                display: false,

                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Mulish',
                    },
                    color: '#fff',
                },
            },

            title: {
                display: !!props.title,
                text: props.title,
            },
        },
    };

    const chartRef = ref<InstanceType<typeof BarChart>>();

    onMounted(() => {
        const chart = chartRef.value?.chartInstance as Chart;

        chart.canvas.onclick = (evt) => {
            const res = chart.getElementsAtEventForMode(
                evt,
                'nearest',
                { intersect: true },
                true
            );

            // If didn't click on a bar, `res` will be an empty array
            if (res.length === 0) {
                return;
            }

            if (chart.data.labels) {
                const label = chart.data.labels[res[0].index] as string;
                console.log(label);
            }
        };
    });
</script>

<style scoped></style>
