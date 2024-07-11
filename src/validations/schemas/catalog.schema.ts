import type { ObjectSchema } from 'yup';
import { boolean } from 'yup';
import { object, string } from 'yup';

import { fileSchema, identifiableSchema } from '@/validations';
import type {
    CreateCategorySchema,
    CreateGroupSchema,
    CreateTopicSchema,
} from '@/validations/types/catalog.validation';

/**
 * Define schema for create category form
 */
export const createCategorySchema: ObjectSchema<CreateCategorySchema> = object({
    name: string().required('Please enter name'),
    image: fileSchema.required('Please upload a file'),
    requires_auth: boolean(),
});

/**
 * Define schema for create group form
 */
export const createGroupSchema: ObjectSchema<CreateGroupSchema> = object({
    name: string().required('Please enter name'),
    image: fileSchema.required('Please upload a file'),
    category: identifiableSchema.required('Please select a category'),
    requires_auth: boolean(),
});

/**
 * Define schema for create group form
 */
export const createThemeSchema: ObjectSchema<CreateTopicSchema> = object({
    name: string().required('Please enter name'),
    image: fileSchema.required('Please upload a file'),
    group: identifiableSchema.required('Please select a group'),
    requires_auth: boolean(),
});
