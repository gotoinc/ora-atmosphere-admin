<template>
    <form class="grid gap-2 pb-10" @submit.prevent="onSubmit">
        <div>
            <p class="mb-3">Please enter first name</p>

            <v-text-field
                v-model="firstName"
                name="first_name"
                label="First name"
                :error-messages="errors.first_name"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please enter last name</p>

            <v-text-field
                v-model="lastName"
                name="last_name"
                label="Last name"
                :error-messages="errors.last_name"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please enter email</p>

            <v-text-field
                v-model="email"
                name="email"
                label="Email"
                :error-messages="errors.email"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please enter company name</p>

            <v-text-field
                v-model="companyName"
                name="company_name"
                label="Company name"
                :error-messages="errors.company_name"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please select activity</p>

            <v-select
                v-model="activity"
                label="Activity"
                variant="outlined"
                clearable
                :error-messages="errors.activity"
                :items="activitiesList"
            />
        </div>

        <div>
            <p class="mb-3">Please enter job title</p>

            <v-text-field
                v-model="jobTitle"
                name="job_title"
                label="Job title"
                :error-messages="errors.job_title"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please enter company website</p>

            <v-text-field
                v-model="companyWebsite"
                name="company_website"
                label="Company website"
                :error-messages="errors.company_website"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please enter phone number</p>

            <v-text-field
                v-model="phone"
                name="phone"
                label="Phone number"
                :error-messages="errors.phone_number"
                variant="outlined"
            />
        </div>

        <v-btn
            :loading="isLoading"
            type="submit"
            class="text-none w-fit"
            color="primary"
        >
            Save changes
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import type { CreateFormEmits } from '@/components/forms/types';

    import { updateProfile } from '@/api/auth/update-profile.api.ts';
    import activitiesList from '@/constants/activities-list.ts';
    import type { UserProfile } from '@/ts/users';
    import { editUserSchema } from '@/validations/schemas/user.schema.ts';
    import type { UserInput } from '@/validations/types/user.validation';

    const props = defineProps<{ user: UserProfile }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isLoading = ref(false);

    const { defineField, handleSubmit, errors, setValues } = useForm<UserInput>(
        {
            validationSchema: editUserSchema,
        }
    );

    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');
    const [email] = defineField('email');
    const [companyName] = defineField('company_name');
    const [activity] = defineField('activity');
    const [jobTitle] = defineField('job_title');
    const [companyWebsite] = defineField('company_website');
    const [phone] = defineField('phone_number');
    const [role] = defineField('role');

    setValues({ ...props.user });

    // TODO: add role for all users
    role.value = 'admin';

    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;

        try {
            await updateProfile(props.user.id, values);

            toast.success('User has been successfully updated');

            emits('update');
            emits('close');
        } catch (e) {
            toast.error('User was not updated');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped></style>
