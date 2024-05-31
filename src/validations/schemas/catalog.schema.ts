import type { ObjectSchema } from 'yup';
import { object, string } from 'yup';

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
    background: string().required(),
});

/**
 * Define schema for create group form
 */
export const createGroupSchema: ObjectSchema<CreateGroup> = object({
    name: string().required('Please enter name'),
    background: string().required(),
    category: string().required('Please select category'),
});

/**
 * Define schema for create group form
 */
export const createThemeSchema: ObjectSchema<CreateTheme> = object({
    name: string().required('Please enter name'),
    background: string().required(),
    group: string().required('Please select group'),
});
