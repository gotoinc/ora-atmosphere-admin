<template>
    <div class="flex min-h-screen max-lg:flex-col-reverse">
        <section class="flex flex-1 items-center justify-center bg-surface p-5">
            <router-view></router-view>
        </section>

        <div class="bg flex min-h-24 items-center justify-center lg:flex-1">
            <main-logo />
        </div>
    </div>
</template>

<script setup lang="ts">
    import MainLogo from '@/components/base/MainLogo.vue';
</script>

<style scoped>
    .bg {
        background: linear-gradient(
            180deg,
            #0acffe 0%,
            rgba(73, 90, 255, 0.7) 100%
        );
    }
</style>
