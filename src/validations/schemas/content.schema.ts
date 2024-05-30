import type { ObjectSchema } from 'yup';
import { array, boolean, number, object, string } from 'yup';

import type { CreateContent } from '@/validations/types/content';

/**
 * Define schema for create category form
 */
export const createContentSchema: ObjectSchema<CreateContent> = object({
    file_url: string().required('Please select file'),
    title: string().required('Please enter title'),
    description: string(),
    topic_id: number().required('Please select topic'),
    languages: array()
        .min(1, 'At least one language is required')
        .required('Languages are required'),
    tags: array(),
    requires_auth: boolean(),
    with_narration: boolean(),
    with_sound: boolean(),
    duration: number().required(),
});
