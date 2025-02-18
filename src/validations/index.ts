import type { ObjectSchema } from 'yup';
import { boolean, mixed, number, object, string } from 'yup';

import { fileSizeLimit } from '@/constants/fileSizeLimit.ts';
import type { VideoFile } from '@/ts/common';
import { isFile } from '@/ts/guards/file.guard.ts';
import type { CreateAudio } from '@/validations/types/content.validation';

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
    .nullable()
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
    .test('value', 'Field must be a file', (value) => {
        return isFile(value) || typeof value === 'string';
    })
    .test('fileSize', 'File size is too large', (value) => {
        if (value && isFile(value)) {
            return value.size < fileSizeLimit; // not bigger that 50mb
        } else {
            return true;
        }
    });

// Common schema for catalog
export const commonCatalogSchema = object({
    id: number().required('ID is required').typeError('ID must be a number'),
    name: string()
        .required('Name is required')
        .typeError('Name must be a string'),
    image: string().nullable().typeError('Image must be a string or null'),
    requires_auth: boolean().notRequired().typeError('Must be a boolean'),
    date_created: string()
        .required('Date Created is required')
        .typeError('Date Created must be a string'),
    contents_amount: number()
        .required('Contents Amount is required')
        .typeError('Contents Amount must be a number'),
});

export const identifiableSchema = object({
    id: number().required('Please select').typeError('ID must be a number'),
    name: string().required('Please select').typeError('Name must be a string'),
});

// Audio schema
export const audioSchema: ObjectSchema<CreateAudio> = object({
    id: number().typeError('ID must be a number'),
    file: fileSchema.required('Please upload a file'),
    duration: number().required('Please enter the duration'),
    language: identifiableSchema.required(
        'Please select language for each audio'
    ),
    size: number()
        .required('Please enter the size')
        .max(fileSizeLimit, 'Size must be at most 50MB'),
});

export const videoSchema: ObjectSchema<VideoFile> = object({
    id: number().typeError('ID must be a number'),
    file: fileSchema.required('Please upload a file'),
    language: identifiableSchema.required(
        'Please select language for each video'
    ),
});

// Group schema
export const groupSchema = commonCatalogSchema.concat(
    object({
        category: identifiableSchema,
    })
);
