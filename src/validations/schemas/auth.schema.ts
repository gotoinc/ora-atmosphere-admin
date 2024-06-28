import type { ObjectSchema } from 'yup';
import { object, ref, string } from 'yup';

import { emailValidation, passwordValidation } from '@/validations';
import type {
    EmailType,
    SetNewPasswordType,
    SignInInput,
} from '@/validations/types/auth';

/**
 * Define schema for Sign in form
 */
export const signInSchema: ObjectSchema<SignInInput> = object({
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
