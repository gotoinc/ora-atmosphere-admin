<template>
    <div class="mx-auto text-white">
        <h1 class="mb-6 text-h4">Choose a new password</h1>

        <form class="mb-6" @submit.prevent="onSubmit">
            <div class="mb-6 grid gap-4">
                <v-text-field
                    v-model="password"
                    name="password"
                    variant="outlined"
                    label="Password"
                    placeholder="Set your password"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :error-messages="errors.new_password1"
                    hint="Use 8 or more characters with a mix of letters, numbers & symbols"
                    @click:append-inner="show1 = !show1"
                />

                <v-text-field
                    v-model="confirmPassword"
                    name="confirmPassword"
                    variant="outlined"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    :error-messages="errors.new_password2"
                    @click:append-inner="show2 = !show2"
                />
            </div>

            <v-btn
                :loading="isLoading"
                color="primary"
                type="submit"
                class="w-full"
            >
                Change Password
            </v-btn>
        </form>

        <router-link
            class="mx-auto block w-fit text-white underline transition-colors hover:!text-primary-100"
            :to="{ name: 'signInView' }"
        >
            Go to Sign in
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import { setNewPassword } from '@/api/auth/set-new-password.api.ts';
    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const { defineField, handleSubmit, resetForm, errors } =
        useForm<SetNewPasswordType>({
            validationSchema: setNewPasswordSchema,
            initialValues: {
                new_password1: '',
                new_password2: '',
            },
        });

    const [password] = defineField('new_password1');
    const [confirmPassword] = defineField('new_password2');

    const isLoading = ref(false);

    const show1 = ref(false);
    const show2 = ref(false);

    const onSubmit = handleSubmit(async () => {
        isLoading.value = true;

        try {
            await setNewPassword({
                new_password: password.value,
                uid: route.params.uid as string,
                token: route.params.token as string,
            });

            await router.replace({ name: 'signInView' });

            toast.success('Password has been changed');

            resetForm();
        } catch (e) {
            toast.error('Password has not been changed');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped></style>
