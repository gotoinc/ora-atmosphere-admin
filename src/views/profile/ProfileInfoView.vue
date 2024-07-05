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
            <p class="mb-3">Last name</p>

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
                v-model="company"
                :error-messages="errors.company"
                name="company_name"
                label="Company name"
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
    import { computed } from 'vue';
    import { useForm } from 'vee-validate';

    import { useAuthStore } from '@/stores/auth.store.ts';

    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import type { AdminUser } from '@/ts/users';
    import { createUserSchema } from '@/validations/schemas/user.schema.ts';

    const { defineField, handleSubmit, errors, setValues, controlledValues } =
        useForm<AdminUser>({
            validationSchema: createUserSchema,
            initialValues: {
                email: '',
                company: '',
            },
        });

    const isButtonDisabled = computed(
        () => !!profile && useCompareObjects(controlledValues.value, profile)
    );

    const [email] = defineField('email');
    const [company] = defineField('company');
    const [role] = defineField('role');
    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');

    const toCapitalize = (value: string) =>
        value[0].toUpperCase() + value.slice(1);

    const { profile } = useAuthStore();

    if (profile) {
        setValues({
            ...profile,
            role: toCapitalize(profile.role),
        });
    }

    const onSubmit = handleSubmit(() => {});
</script>

<style scoped></style>
