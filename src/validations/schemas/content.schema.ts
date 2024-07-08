import type { ObjectSchema } from 'yup';
import { boolean } from 'yup';
import { array, object, string } from 'yup';

import {
    audioSchema,
    fileSchema,
    languageSchema,
    topicSchema,
} from '@/validations';
import type { CreateContentSchema } from '@/validations/types/content.validation';

/**
 * Define schema for create category form
 */
export const createContentSchema: ObjectSchema<CreateContentSchema> = object({
    title: string().required('Please enter the title'),
    file: fileSchema.required('Please select file'),
    image: fileSchema,
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
