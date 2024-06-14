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
                    class="capitalize"
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

                <v-btn
                    :disabled="isButtonDisabled"
                    type="submit"
                    class="text-none w-fit"
                    color="primary"
                >
                    {{ admin ? 'Save changes' : 'Add admin' }}
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useForm } from 'vee-validate';

    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import type { AdminUser } from '@/ts/users';
    import { createUserSchema } from '@/validations/schemas/user.schema.ts';

    const roles = ['admin', 'super admin'];

    const props = defineProps<{ admin?: AdminUser }>();
    const emits = defineEmits<{ (e: 'close'): void }>();

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

    if (props.admin) {
        setValues({ ...props.admin });
    }

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
