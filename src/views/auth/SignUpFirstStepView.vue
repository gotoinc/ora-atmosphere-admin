<template>
    <form class="text-white" @submit.prevent="onSubmit">
        <div class="mb-2 grid gap-4">
            <v-text-field
                v-model="firstName"
                variant="outlined"
                label="First Name"
                placeholder="Enter your first name"
                name="firstName"
                :error-messages="firstStepErrors.firstName"
            />

            <v-text-field
                v-model="lastName"
                variant="outlined"
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                :error-messages="firstStepErrors.lastName"
            />

            <v-text-field
                v-model="email"
                variant="outlined"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                :error-messages="firstStepErrors.email"
            />

            <v-text-field
                v-model="password"
                variant="outlined"
                name="password"
                type="password"
                label="Password"
                placeholder="Set your password"
                :error-messages="firstStepErrors.password"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
            />

            <v-text-field
                v-model="confirmPassword"
                variant="outlined"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                :error-messages="firstStepErrors.confirmPassword"
            />
        </div>

        <v-checkbox
            v-model="isTermsAgreed"
            :error="!!firstStepErrors.isTermsAgreed"
        >
            <template #label>
                <span class="text-white">
                    Agree to our
                    <a
                        href="#"
                        class="underline transition-colors hover:text-primary-100"
                    >
                        Terms of use
                    </a>

                    and

                    <a
                        href="#"
                        class="underline transition-colors hover:text-primary-100"
                    >
                        Privacy Policy
                    </a>
                </span>
            </template>
        </v-checkbox>

        <v-btn class="w-full" type="submit" color="primary"> Next </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    const router = useRouter();

    const signUpStore = useSignUpStore();

    const {
        confirmPassword,
        password,
        isTermsAgreed,
        email,
        firstName,
        lastName,
        firstStepErrors,
    } = storeToRefs(signUpStore);

    const onSubmit = signUpStore.submitFirstStep(() => {
        void router.push({ name: 'signUpSecondStep' });
    });
</script>

<style scoped></style>
