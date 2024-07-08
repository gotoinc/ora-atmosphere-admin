import type { ObjectSchema } from 'yup';
import { array } from 'yup';
import { boolean, mixed, number, object, string } from 'yup';

import type { Group, Topic } from '@/ts/catalog';
import { isFile } from '@/ts/guards/file.guard.ts';
// import { groupSchema } from '@/validations/schemas/catalog.schema.ts';

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
export const audioSchema = object({
    name: string().required('Please enter the name'),
    file: mixed<File | string>()
        .test(
            'is-file-or-string',
            'File must be a valid file or a string',
            (value) => {
                return typeof value === 'string' || value instanceof File;
            }
        )
        .required('Please upload a file or provide a file URL'),
    duration: number()
        .required('Please enter the duration')
        .min(1, 'Duration must be at least 1 second')
        .max(3600, 'Duration must be at most 3600 seconds (1 hour)'),
    size: number()
        .required('Please enter the size')
        .max(50000000, 'Size must be at most 50MB'), // Example max size: 50MB
});

export const languageSchema = object({
    id: number().required(),
    name: string().required('Please select language'),
});

export const topicSchema: ObjectSchema<Topic> = object({
    id: number().required('ID is required'),
    name: string().required('Name is required'),
    image: string().nullable(),
    requires_auth: boolean().required('Requires auth is required'),
    is_active: boolean().required('Is active is required'),
    group: number().required('Please select group'),
});

/**
 * Define schema for group
 */
export const groupSchema: ObjectSchema<Group> = object({
    id: number().required('ID is required'),
    name: string().required('Name is required'),
    image: string().nullable().required(),
    requires_auth: boolean().required(),
    is_active: boolean().required(),
    topics: array().of<Topic>(topicSchema).required(),
});
