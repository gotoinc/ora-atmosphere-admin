import type { ObjectSchema } from 'yup';
import { boolean } from 'yup';
import { number } from 'yup';
import { object, string } from 'yup';

import { fileSchema } from '@/validations';
import type {
    CreateCategory,
    CreateGroup,
    CreateTheme,
} from '@/validations/types/catalog';

/**
 * Define schema for create category form
 */
export const createCategorySchema: ObjectSchema<CreateCategory> = object({
    name: string().required('Please enter name'),
    image: fileSchema.required('Please upload a file'),
    requires_auth: boolean(),
});

/**
 * Define schema for create group form
 */
export const createGroupSchema: ObjectSchema<CreateGroup> = object({
    name: string().required('Please enter name'),
    image: fileSchema.required('Please upload a file'),
    category_id: number().required('Please select category'),
    requires_auth: boolean(),
});

/**
 * Define schema for create group form
 */
export const createThemeSchema: ObjectSchema<CreateTheme> = object({
    name: string().required('Please enter name'),
    image: fileSchema.required('Please upload a file'),
    group_id: number().required('Please select group'),
    requires_auth: boolean(),
});
