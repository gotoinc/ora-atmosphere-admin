import { boolean, mixed, number, object, string } from 'yup';

import { isFile } from '@/ts/guards/file.guard.ts';

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

    image: string().required('Image URL is required'),

    group_id: number()
        .required('Group ID is required')
        .positive('Group ID must be a positive number')
        .integer('Group ID must be an integer'),

    requires_auth: boolean().required(),
});

// File schema
export const fileSchema = mixed<File | string>()
    .test('value', 'Field is required', (value) => {
        return isFile(value) || typeof value === 'string';
    })
    .test('fileSize', 'File size is too large', (value) => {
        if (value && isFile(value)) {
            return value.size <= 5000000; // not bigger that 5mb
        } else {
            return true;
        }
    });

// Audio schema
export const audioSchema = mixed<File | string>()
    .test(
        'is-file-or-string',
        'Audio must be a valid file or a string',
        (value) => {
            return typeof value === 'string' || value instanceof File;
        }
    )
    .required('Please upload a file or provide a file URL');
