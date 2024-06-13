import { boolean, number, object, string } from 'yup';

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

// Topic schema
export const topicSchema = object().shape({
    id: number()
        .required('ID is required')
        .positive('ID must be a positive number')
        .integer('ID must be an integer'),

    name: string()
        .required('Name is required')
        .min(1, 'Name must be at least 1 character long')
        .max(255, 'Name must be at most 255 characters long'),

    image_url: string().required('Image URL is required'),

    group_id: number()
        .required('Group ID is required')
        .positive('Group ID must be a positive number')
        .integer('Group ID must be an integer'),

    requires_auth: boolean().required(),
});
