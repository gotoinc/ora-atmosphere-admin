<template>
    <div class="rounded-lg bg-dark p-6 shadow-2xl">
        <form class="grid gap-2" @submit.prevent="onSubmit">
            <div>
                <p class="mb-3">Please enter an email of new admin</p>

                <v-text-field
                    v-model="email"
                    :error-messages="errors.email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                />
            </div>

            <div>
                <p class="mb-3">Please enter a company name</p>

                <v-text-field
                    v-model="company"
                    :error-messages="errors.company"
                    name="company"
                    label="Company"
                    variant="outlined"
                />
            </div>

            <div>
                <p class="mb-3">Please select role of admin</p>

                <v-select
                    v-model="role"
                    label="Role"
                    variant="outlined"
                    clearable
                    :error-messages="errors.role"
                    :items="roles"
                />
            </div>

            <div class="flex justify-center gap-4">
                <v-btn
                    class="text-none w-fit"
                    color="error"
                    @click="emits('close')"
                >
                    Cancel
                </v-btn>

                <v-btn type="submit" class="text-none w-fit" color="primary">
                    Add admin
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';

    import { createUserSchema } from '@/validations/schemas/user.schema.ts';
    import type { CreateUser } from '@/validations/types/user';

    const roles = ['Customer Admin', 'Super Admin'];

    const emits = defineEmits<{ (e: 'close'): void }>();

    const { defineField, handleSubmit, errors, resetForm } =
        useForm<CreateUser>({
            validationSchema: createUserSchema,
            initialValues: {
                email: '',
                company: '',
            },
        });

    const [email] = defineField('email');
    const [company] = defineField('company');
    const [role] = defineField('role');

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
