import { string } from 'yup';

/**
 * Define common validations
 */

// Email
export const emailValidation = string()
    .email('Please enter a valid email')
    .required('Please enter email');

// Password
export const passwordValidation = string()
    .required('Please enter password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
    );

// Phone number
export const phoneValidation = string()
    .test(
        'is-valid-phone',
        'Must be only digits',
        (value) => !value || /^[0-9+]+$/.test(value)
    )
    .test(
        'min-digits',
        'Phone should contain at least 5 digits',
        (value) => !value || value.length >= 5
    )
    .test(
        'max-digits',
        'Phone must be no longer than 15 digits',
        (value) => !value || value.length <= 15
    );
