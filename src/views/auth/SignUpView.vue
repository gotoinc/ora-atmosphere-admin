<template>
    <div class="mb-6 text-white">
        <h1 class="mb-2 text-h2">Sign up</h1>

        <p class="mb-6 text-base text-grey-150">
            Sign up to access our entire catalog
        </p>

        <p class="text-base font-semibold text-grey-150">
            Step {{ route.name === 'signUpFirstStep' ? 1 : 2 }} of 2
        </p>
    </div>

    <router-view></router-view>

    <div class="mt-6 text-white">
        <p class="mb-2">
            Already have an account?
            <router-link
                class="font-medium underline transition-colors hover:text-primary-100"
                :to="{ name: 'signInView' }"
            >
                Sign In
            </router-link>
        </p>

        <p class="text-grey-150">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a
                href="#"
                target="_blank"
                class="transition-colors hover:text-primary-100"
            >
                Learn more.
            </a>
        </p>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>

<style scoped></style>
