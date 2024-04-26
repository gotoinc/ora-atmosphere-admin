<template>
    <div class="w-full max-w-2xl">
        <h1 class="mb-5 text-2xl">Login</h1>

        <form @submit.prevent="onSubmit">
            <div class="grid gap-y-4">
                <v-text-field
                    v-model="email"
                    :error-messages="errors.email"
                    label="Email"
                    variant="outlined"
                    placeholder="example@mail.com"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :error-messages="errors.password"
                    label="Password"
                    variant="outlined"
                    placeholder="********"
                    type="password"
                ></v-text-field>

                <v-btn type="submit" class="w-fit" color="primary">
                    Sign in
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';

    import { loginSchema } from '@/validations/schemas/form.schemas.ts';
    import type { LoginForm } from '@/validations/types/forms';

    const { handleSubmit, errors, defineField, handleReset } =
        useForm<LoginForm>({
            validationSchema: loginSchema,
            initialValues: {
                email: '',
                password: '',
            },
        });

    const [email] = defineField('email');
    const [password] = defineField('password');

    const onSubmit = handleSubmit((values) => {
        console.log(values);

        handleReset();
    });
</script>

<style scoped></style>
