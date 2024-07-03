import type { ObjectSchema } from 'yup';
import { array, boolean, number, object, string } from 'yup';

import { audioSchema } from '@/validations';
import type { CreateContent } from '@/validations/types/content';

/**
 * Define schema for create category form
 */
export const createContentSchema: ObjectSchema<CreateContent> = object({
    file: string().required('Please select file'),
    title: string().required('Please enter title'),
    description: string(),
    topic_id: number().required('Please select topic'),
    language: string().required('Please select language'),
    tags: array(),
    requires_auth: boolean(),
    speech: boolean(),
    audio: boolean(),
    duration: number().required(),
    tracks: array().of(audioSchema),
});
