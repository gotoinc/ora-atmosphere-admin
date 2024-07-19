<template>
    <form class="grid gap-2" @submit.prevent="onSubmit">
        <div>
            <v-text-field
                v-model="firstName"
                :error-messages="errors.first_name"
                name="first_name"
                label="First name"
                variant="outlined"
            />
        </div>

        <div>
            <v-text-field
                v-model="lastName"
                :error-messages="errors.last_name"
                name="last_name"
                label="Last name"
                variant="outlined"
            />
        </div>

        <div>
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
            <v-text-field
                v-model="role"
                label="Role"
                variant="outlined"
                clearable
                class="capitalize"
                disabled
            />
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
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { updateProfile } from '@/api/auth/update-profile.api.ts';
    import type { AdminUser, Role } from '@/ts/users';
    import { createUserSchema } from '@/validations/schemas/user.schema.ts';

    const toast = useToast();

    const isLoading = ref(false);

    const { defineField, handleSubmit, errors, setValues } = useForm<AdminUser>(
        {
            validationSchema: createUserSchema.omit(['password', 'role']),
            initialValues: {
                email: '',
            },
        }
    );

    const [email] = defineField('email');
    const [role] = defineField('role');
    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');

    const toCapitalize = (value: string) =>
        value[0].toUpperCase() + value.slice(1);

    const authStore = useAuthStore();
    const { profile } = storeToRefs(authStore);

    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;

        if (profile.value) {
            try {
                const res = await updateProfile(profile.value.id, {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    role: values.role,
                });

                if (res) {
                    profile.value.first_name = res.first_name;
                    profile.value.last_name = res.last_name;
                    profile.value.email = res.email;
                }

                toast.success('Profile has been updated');
            } catch (e) {
                toast.error('Profile was not updated');
            } finally {
                isLoading.value = false;
            }
        }
    });

    onMounted(async () => {
        if (!profile.value) {
            await authStore.getProfileInfo();
        }

        if (profile.value) {
            setValues({
                ...profile.value,
                role: toCapitalize(profile.value.role) as Role,
            });
        }
    });
</script>

<style scoped></style>
