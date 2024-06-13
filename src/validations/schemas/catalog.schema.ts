import type { ObjectSchema } from 'yup';
import { boolean } from 'yup';
import { number } from 'yup';
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
    image: string().required('Please select image'),
    requires_auth: boolean(),
});

/**
 * Define schema for create group form
 */
export const createGroupSchema: ObjectSchema<CreateGroup> = object({
    name: string().required('Please enter name'),
    image: string().required(),
    category_id: number().required('Please select category'),
    requires_auth: boolean(),
});

/**
 * Define schema for create group form
 */
export const createThemeSchema: ObjectSchema<CreateTheme> = object({
    name: string().required('Please enter name'),
    image: string().required(),
    group_id: number().required('Please select group'),
    requires_auth: boolean(),
});
