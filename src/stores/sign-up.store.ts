import { useForm } from 'vee-validate';

import { defineStore } from 'pinia';

import {
    signUpFirstStepSchema,
    signUpSecondStepSchema,
} from '@/validations/schemas/auth.schema.ts';
import type {
    SignUpFirstStep,
    SignUpSecondStep,
} from '@/validations/types/auth';

export const useSignUpStore = defineStore('sign-up', () => {
    /**
     * Handle validation for first steps
     */
    const {
        handleSubmit: submitFirstStep,
        errors: firstStepErrors,
        defineField: defineFirstSteps,
        values: firstStepValues,
    } = useForm<SignUpFirstStep>({
        validationSchema: signUpFirstStepSchema,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isTermsAgreed: false,
        },
    });

    const [firstName] = defineFirstSteps('firstName');
    const [lastName] = defineFirstSteps('lastName');
    const [email] = defineFirstSteps('email');
    const [password] = defineFirstSteps('password');
    const [confirmPassword] = defineFirstSteps('confirmPassword');
    const [isTermsAgreed] = defineFirstSteps('isTermsAgreed');

    // Check if object valid
    const validateObject = (obj: { [key: string]: string | boolean }) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (!value) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Handle validation for second steps
     */
    const {
        handleSubmit: submitSecondStep,
        errors: secondStepErrors,
        defineField: defineSecondSteps,
    } = useForm<SignUpSecondStep>({
        validationSchema: signUpSecondStepSchema,
        initialValues: {
            companyName: '',
            jobTitle: '',
            phone: '',
            companyWebsite: '',
        },
    });

    const [companyName] = defineSecondSteps('companyName');
    const [activity] = defineSecondSteps('activity');
    const [jobTitle] = defineSecondSteps('jobTitle');
    const [companyWebsite] = defineSecondSteps('companyWebsite');
    const [phone] = defineSecondSteps('phone');

    return {
        firstStepValues,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isTermsAgreed,

        validateObject,

        submitFirstStep,
        firstStepErrors,

        companyName,
        jobTitle,
        activity,
        companyWebsite,
        phone,

        submitSecondStep,
        secondStepErrors,
    };
});
