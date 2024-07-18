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
            :disabled="isButtonDisabled"
            class="text-none w-fit"
            color="primary"
            type="submit"
        >
            Save changes
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useForm } from 'vee-validate';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import type { AdminUser, Role } from '@/ts/users';
    import { createUserSchema } from '@/validations/schemas/user.schema.ts';

    const { defineField, handleSubmit, errors, setValues, controlledValues } =
        useForm<AdminUser>({
            validationSchema: createUserSchema,
            initialValues: {
                email: '',
            },
        });

    const isButtonDisabled = computed(
        () =>
            !!profile.value &&
            !!useCompareObjects(controlledValues.value, profile.value)
    );

    const [email] = defineField('email');
    const [role] = defineField('role');
    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');

    const toCapitalize = (value: string) =>
        value[0].toUpperCase() + value.slice(1);

    const authStore = useAuthStore();
    const { profile } = storeToRefs(authStore);

    const onSubmit = handleSubmit(() => {});

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
