import type { ObjectSchema } from 'yup';
import { bool, object, ref, string } from 'yup';

import {
    emailValidation,
    passwordValidation,
    phoneValidation,
} from '@/validations';
import type {
    EmailType,
    SetNewPasswordType,
    SignInType,
    SignUpFirstStep,
    SignUpSecondStep,
} from '@/validations/types/auth';

/**
 * Define schemas for Sign up form
 */
export const signUpFirstStepSchema: ObjectSchema<SignUpFirstStep> = object({
    firstName: string().required('Please enter first name'),
    lastName: string().required('Please enter last name'),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: string()
        .required('Please confirm password')
        .oneOf([ref('password'), ''], 'Passwords must match'),
    isTermsAgreed: bool()
        .oneOf([true], 'Please accept')
        .required('Please accept'),
});

export const signUpSecondStepSchema: ObjectSchema<SignUpSecondStep> = object({
    companyName: string().required('Please enter company name'),
    activity: string().required('Please choose activity'),
    jobTitle: string(),
    companyWebsite: string().url('Please enter a valid URL'),
    phone: phoneValidation,
});

/**
 * Define schema for Sign in form
 */
export const signInSchema: ObjectSchema<SignInType> = object({
    email: emailValidation,
    password: passwordValidation,
});

/**
 * Define schema for forgot password
 */
export const forgotPasswordSchema: ObjectSchema<EmailType> = object({
    email: emailValidation,
});

/**
 * Define schema for choose new password
 */
export const setNewPasswordSchema: ObjectSchema<SetNewPasswordType> = object({
    password: passwordValidation,
    confirmPassword: string()
        .required('Please confirm password')
        .oneOf([ref('password'), ''], 'Passwords must match'),
});
