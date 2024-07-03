<template>
    <form class="grid gap-2" @submit.prevent="onSubmit">
        <div>
            <p class="mb-3">Set new password</p>

            <v-text-field
                v-model="password"
                :error-messages="errors.password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Confirm password</p>

            <v-text-field
                v-model="confirmPassword"
                :error-messages="errors.confirmPassword"
                name="confirmPassword"
                type="password"
                label="Password"
                variant="outlined"
            />
        </div>

        <v-btn class="text-none w-fit" color="primary" type="submit">
            Save changes
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';

    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const { defineField, handleSubmit, errors } = useForm<SetNewPasswordType>({
        validationSchema: setNewPasswordSchema,
    });

    const [password] = defineField('password');
    const [confirmPassword] = defineField('confirmPassword');

    const onSubmit = handleSubmit((values) => {
        console.log(values);
    });
</script>

<style scoped></style>
