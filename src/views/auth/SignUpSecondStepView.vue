<template>
    <form class="mb-6 text-white" @submit.prevent="onSubmit">
        <div class="mb-6 grid gap-4">
            <v-text-field
                v-model="companyName"
                variant="outlined"
                label="Company Name"
                placeholder="Enter your company name"
                name="companyName"
                :error-messages="secondStepErrors.companyName"
            />

            <v-select
                v-model="activity"
                label="Choose your activity"
                variant="outlined"
                clearable
                :items="activitiesList"
                :error-messages="secondStepErrors.activity"
                @select="(value) => console.log(value)"
            />

            <v-text-field
                v-model="jobTitle"
                variant="outlined"
                label="Job Title"
                name="jobTitle"
                placeholder="Enter your job title"
                :error-messages="secondStepErrors.jobTitle"
            />

            <v-text-field
                v-model="companyWebsite"
                variant="outlined"
                name="companyWebsite"
                label="Company Website"
                placeholder="Enter your company website"
                :error-messages="secondStepErrors.companyWebsite"
            />

            <v-text-field
                v-model="phone"
                variant="outlined"
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                :error-messages="secondStepErrors.phone"
            />
        </div>

        <div class="flex gap-4 max-mob:flex-col">
            <v-btn
                :to="{ name: 'signUpFirstStep' }"
                variant="outlined"
                class="flex-grow"
                color="primary"
            >
                Back
            </v-btn>

            <v-btn type="submit" class="flex-grow" color="primary">
                Sign Up
            </v-btn>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    import activitiesList from '@/constants/activities-list.ts';

    const signUpStore = useSignUpStore();

    const router = useRouter();

    const {
        companyName,
        jobTitle,
        activity,
        companyWebsite,
        phone,
        secondStepErrors,
    } = storeToRefs(signUpStore);

    const onSubmit = signUpStore.submitSecondStep(() => {
        void router.push({ name: 'main' });
    });
</script>

<style scoped lang="postcss"></style>
