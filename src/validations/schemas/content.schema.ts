import type { ObjectSchema } from 'yup';
import { boolean } from 'yup';
import { array, object, string } from 'yup';

import { audioSchema, fileSchema, identifiableSchema } from '@/validations';
import type { CreateContentSchema } from '@/validations/types/content.validation';

/**
 * Define schema for create category form
 */
export const createContentSchema: ObjectSchema<CreateContentSchema> = object({
    title: string().required('Please enter the title'),
    file: fileSchema.required('Please select file'),
    previewImage: fileSchema,
    description: string().nullable(),
    audios: array().of(audioSchema),
    languages: identifiableSchema.required('Please select language'),
    tags: array().of(string().required()),
    topic: identifiableSchema.required('Please select a theme'),
    requiresAuth: boolean(),
    narrationEnabled: boolean(),
    audioEnabled: boolean(),
});
