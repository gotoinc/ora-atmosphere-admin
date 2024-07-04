<template>
    <div class="mx-auto text-white">
        <h1 class="mb-6 text-h4">Choose a new password</h1>

        <form class="mb-6" @submit.prevent="onSubmit">
            <div class="mb-6 grid gap-4">
                <v-text-field
                    v-model="password"
                    name="password"
                    variant="outlined"
                    type="password"
                    label="Password"
                    placeholder="Set your password"
                    :error-messages="errors.password"
                    hint="Use 8 or more characters with a mix of letters, numbers & symbols"
                />

                <v-text-field
                    v-model="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    :error-messages="errors.confirmPassword"
                />
            </div>

            <v-btn color="primary" type="submit" class="w-full">
                Change Password
            </v-btn>
        </form>

        <router-link
            class="text-white underline transition-colors hover:!text-primary-100"
            :to="{ name: 'signInView' }"
        >
            Go to Sign in
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';

    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const { defineField, handleSubmit, resetForm, errors } =
        useForm<SetNewPasswordType>({
            validationSchema: setNewPasswordSchema,
            initialValues: {
                password: '',
                confirmPassword: '',
            },
        });

    const [password] = defineField('password');
    const [confirmPassword] = defineField('confirmPassword');

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
