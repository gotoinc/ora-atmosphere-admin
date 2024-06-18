<template>
    <div
        class="card group relative flex max-w-card items-center justify-center break-all rounded-2xl p-2 text-center text-4xl font-bold"
    >
        <div
            class="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden rounded-2xl before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:content-normal before:bg-primary-100/35"
        >
            <img
                :src="img"
                class="h-full w-full object-cover transition-transform"
                :alt="name"
            />
        </div>

        {{ name }}
    </div>
</template>

<script setup lang="ts">
    interface Props {
        name?: string;
        img: string;
    }

    defineProps<Props>();
</script>

<style scoped lang="postcss">
    .card {
        min-height: 195px;
    }
</style>
