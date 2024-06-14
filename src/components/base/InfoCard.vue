<template>
    <v-card class="w-full overflow-visible rounded bg-grey-300">
        <div
            class="info-card mx-4 flex items-center justify-center rounded bg-primary-100 p-5 text-4xl font-bold shadow-2xl"
        >
            <slot name="top"></slot>
        </div>

        <v-card-text class="flex items-end gap-3 pt-0">
            <slot name="text"></slot>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts"></script>

<style scoped>
    .info-card {
        top: -24px;
        position: relative;
        min-height: 120px;
        margin: 0 auto;
    }
</style>
