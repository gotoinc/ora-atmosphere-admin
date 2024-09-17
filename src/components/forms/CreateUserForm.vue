<template>
    <div class="pb-10">
        <form class="grid gap-2" @submit.prevent="onSubmit">
            <div>
                <p class="mb-3">Please enter first name</p>

                <v-text-field
                    v-model="firstName"
                    :error-messages="errors.first_name"
                    name="first_name"
                    label="First name"
                    variant="outlined"
                />
            </div>

            <div>
                <p class="mb-3">Please enter last name</p>

                <v-text-field
                    v-model="lastName"
                    :error-messages="errors.last_name"
                    name="last_name"
                    label="Last name"
                    variant="outlined"
                />
            </div>

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
                <p class="mb-3">Please enter password</p>

                <v-text-field
                    v-model="password"
                    name="password"
                    variant="outlined"
                    label="Password"
                    placeholder="Set your password"
                    :error-messages="errors.password"
                    :append-inner-icon="
                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                />
            </div>

            <div>
                <p class="mb-3">Please select role of admin</p>

                <v-select
                    v-model="role"
                    label="Role"
                    variant="outlined"
                    clearable
                    class="capitalize"
                    :error-messages="errors.role"
                    :items="userRoles"
                />
            </div>

            <v-btn
                :loading="isLoading"
                type="submit"
                class="text-none w-fit"
                color="primary"
            >
                Add admin
            </v-btn>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import type { CreateFormEmits } from '@/components/forms/types';

    import { postAdmin } from '@/api/users/post-admin.api.ts';
    import { userRoles } from '@/constants/user-roles.ts';
    import { createUserSchema } from '@/validations/schemas/user.schema.ts';
    import type { CreateAdminSchema } from '@/validations/types/user.validation';

    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const { defineField, handleSubmit, errors, resetForm } =
        useForm<CreateAdminSchema>({
            validationSchema: createUserSchema,
            initialValues: {
                email: '',
            },
        });

    const [email] = defineField('email');
    const [role] = defineField('role');
    const [password] = defineField('password');
    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');

    const isLoading = ref(false);
    const showPassword = ref(false);

    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;
        try {
            await postAdmin(values);

            toast.success('Admin has been successfully created');
            resetForm();

            emits('update');
            emits('close');
        } catch (e) {
            toast.error('Admin is not created');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped></style>
