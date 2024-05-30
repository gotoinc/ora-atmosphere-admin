<template>
    <main class="flex min-h-screen max-lg:flex-col max-lg:pt-[60px]">
        <div
            class="banner relative flex w-full items-center justify-center p-12 max-lg:!min-w-min max-lg:!max-w-full max-lg:!bg-none max-lg:p-0"
        >
            <div class="container lg:w-fit">
                <main-logo variant="white" />
            </div>
        </div>

        <section
            class="flex w-full items-center justify-center py-[52px] max-lg:pb-10 max-lg:pt-14"
        >
            <div class="container">
                <div
                    class="mx-auto w-full max-w-[472px] text-dark max-lg:max-w-full"
                >
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import MainLogo from '@/components/base/MainLogo.vue';
</script>

<style scoped lang="postcss">
    .banner {
        max-width: 973px;
        min-width: 536px;
        animation: fade 0.3s ease;
        background: linear-gradient(
            180deg,
            #0acffe 0%,
            rgba(73, 90, 255, 0.7) 100%
        );
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>
