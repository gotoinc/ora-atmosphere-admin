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
                    class="capitalize"
                    :error-messages="errors.role"
                    :items="userRoles"
                />
            </div>

            <v-btn
                :disabled="isButtonDisabled"
                type="submit"
                class="text-none w-fit"
                color="primary"
            >
                {{ admin ? 'Save changes' : 'Add admin' }}
            </v-btn>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useForm } from 'vee-validate';

    import userRoles from '@/constants/user-roles.ts';
    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import type { AdminUser } from '@/ts/users';
    import { createUserSchema } from '@/validations/schemas/user.schema.ts';

    const props = defineProps<{ admin?: AdminUser }>();
    defineEmits<{ (e: 'close'): void }>();

    const isButtonDisabled = computed(
        () =>
            props.admin &&
            useCompareObjects(controlledValues.value, props.admin)
    );

    const {
        defineField,
        handleSubmit,
        errors,
        resetForm,
        setValues,
        controlledValues,
    } = useForm<AdminUser>({
        validationSchema: createUserSchema,
        initialValues: {
            email: '',
            company: '',
        },
    });

    const [email] = defineField('email');
    const [company] = defineField('company');
    const [role] = defineField('role');
    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');

    if (props.admin) {
        setValues({ ...props.admin });
    }

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
