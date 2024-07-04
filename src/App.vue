<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" v-if="Component"></component>

        <v-loader v-else> </v-loader>
    </router-view>
</template>

<script setup lang="ts">
    import VLoader from '@/components/base/VLoader.vue';

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vhUtils = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty(
        '--vh',
        `${vhUtils.toString()}px`
    );

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty(
            '--vh',
            `${vh.toString()}px`
        );
    });
</script>

<style scoped></style>
