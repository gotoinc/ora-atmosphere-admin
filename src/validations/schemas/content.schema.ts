import type { ObjectSchema } from 'yup';
import { array, boolean, mixed, number, object, string } from 'yup';

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
    with_narration: boolean(),
    with_sound: boolean(),
    duration: number().required(),
    audio: array()
        .of(
            mixed<File>()
                .test(
                    'is-file',
                    'Each audio must be a valid file',
                    (value) => value instanceof File
                )
                .required('Please upload audio files')
        )
        .required('Please upload audio files')
        .min(1, 'At least one audio file is required'),
});
