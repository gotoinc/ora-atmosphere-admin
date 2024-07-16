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
    preview_image: fileSchema,
    description: string().nullable(),
    audios: array().of(audioSchema.required()),
    languages: identifiableSchema.required('Please select language'),
    tags: array().of(string().required()),
    topic: identifiableSchema.required('Please select a theme'),
    requires_auth: boolean(),
    narration_enabled: boolean(),
    audio_enabled: boolean(),
});
