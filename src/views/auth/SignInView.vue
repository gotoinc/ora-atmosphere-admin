<template>
    <div class="mx-auto text-white">
        <h1 class="mb-6 text-h2">Sign in</h1>

        <form class="mb-6" @submit.prevent="onSubmit">
            <div class="grid gap-4">
                <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    placeholder="Enter your email"
                    :error-messages="errors.email"
                />

                <v-text-field
                    v-model="password"
                    name="password"
                    variant="outlined"
                    type="password"
                    label="Password"
                    placeholder="Set your password"
                    :error-messages="errors.password"
                />
            </div>

            <div class="my-2 flex flex-wrap items-center justify-between gap-4">
                <v-checkbox
                    v-model="isRememberChecked"
                    hide-details
                    label="Remember me"
                />

                <router-link
                    class="underline transition-colors hover:text-primary-100"
                    :to="{ name: 'resetPasswordView' }"
                >
                    Forgot Password?
                </router-link>
            </div>

            <v-btn
                :loading="isLoading"
                class="w-full"
                color="primary"
                type="submit"
            >
                Sign In
            </v-btn>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useForm } from 'vee-validate';

    import { useAuthStore } from '@/stores/auth.store.ts';

    import { signInSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SignInInput } from '@/validations/types/auth';

    const router = useRouter();
    const { login } = useAuthStore();

    const isRememberChecked = ref(false);
    const isLoading = ref(false);

    const { defineField, handleSubmit, errors, resetForm } =
        useForm<SignInInput>({
            validationSchema: signInSchema,
            initialValues: {
                email: '',
                password: '',
            },
        });

    const [email] = defineField('email');
    const [password] = defineField('password');

    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;

        try {
            await login(values, isRememberChecked.value);

            void router.push({ name: 'main' });

            resetForm();
        } finally {
            isLoading.value = false;
        }

        // setFieldError('email', 'Email already exists');

        // isAuthenticated.value = true;
    });
</script>

<style scoped></style>
