import type { ObjectSchema } from 'yup';
import { boolean } from 'yup';
import { mixed } from 'yup';
import { array, object, string } from 'yup';

import { audioSchema, languageSchema, topicSchema } from '@/validations';
import type { CreateContentSchema } from '@/validations/types/content.validation';

/**
 * Define schema for create category form
 */
export const createContentSchema: ObjectSchema<CreateContentSchema> = object({
    title: string().required('Please enter the title'),
    file: mixed<File | string>()
        .test(
            'is-file-or-string',
            'File must be a valid file or a string',
            (value) => {
                return typeof value === 'string' || value instanceof File;
            }
        )
        .required('Please select file'),
    description: string(),
    audios: array().of(audioSchema),
    languages: languageSchema,
    tags: array().of(string().required()).min(1, 'Please add at least one tag'),
    topic: topicSchema,
    requires_auth: boolean(),
    narration_enabled: boolean(),
    audio_enabled: boolean(),
    show_on_main_banner: boolean(),
    visible_for_unregistered: boolean(),
});
