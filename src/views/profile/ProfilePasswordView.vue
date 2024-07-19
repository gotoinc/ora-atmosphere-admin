<template>
    <form class="grid gap-2" @submit.prevent="onSubmit">
        <div>
            <p class="mb-3">Set new password</p>

            <v-text-field
                v-model="password"
                :error-messages="errors.new_password1"
                name="password"
                label="Password"
                variant="outlined"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
            ></v-text-field>
        </div>

        <div>
            <p class="mb-3">Confirm password</p>

            <v-text-field
                v-model="confirmPassword"
                :error-messages="errors.new_password2"
                name="confirmPassword"
                label="Password"
                variant="outlined"
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append-inner="show2 = !show2"
            ></v-text-field>
        </div>

        <v-btn
            :loading="isLoading"
            class="text-none w-fit"
            color="primary"
            type="submit"
        >
            Save changes
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import { changePassword } from '@/api/auth/change-password.api.ts';
    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const { defineField, handleSubmit, errors } = useForm<SetNewPasswordType>({
        validationSchema: setNewPasswordSchema,
    });

    const toast = useToast();

    const [password] = defineField('new_password1');
    const [confirmPassword] = defineField('new_password2');

    const isLoading = ref(false);

    const show1 = ref(false);
    const show2 = ref(false);

    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;

        try {
            await changePassword(values);

            toast.success('New password has been saved');
        } catch (e) {
            toast.error('Password was not changed');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped></style>
