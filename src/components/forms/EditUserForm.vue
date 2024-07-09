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
            :disabled="isButtonDisabled"
            type="submit"
            class="text-none w-fit"
            color="primary"
        >
            Save changes
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useForm } from 'vee-validate';

    import activitiesList from '@/constants/activities-list.ts';
    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import type { UserProfile } from '@/ts/users';
    import { editUserSchema } from '@/validations/schemas/user.schema.ts';

    const props = defineProps<{ user: UserProfile }>();

    const { defineField, handleSubmit, errors, setValues, controlledValues } =
        useForm<UserProfile>({
            validationSchema: editUserSchema,
        });

    const isButtonDisabled = computed(
        () => !!useCompareObjects(controlledValues.value, props.user)
    );

    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');
    const [email] = defineField('email');
    const [companyName] = defineField('company_name');
    const [activity] = defineField('activity');
    const [jobTitle] = defineField('job_title');
    const [companyWebsite] = defineField('company_website');
    const [phone] = defineField('phone_number');

    setValues({ ...props.user });

    const onSubmit = handleSubmit((values) => {
        console.log(values);
    });
</script>

<style scoped></style>
