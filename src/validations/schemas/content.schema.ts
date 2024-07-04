import type { ObjectSchema } from 'yup';
import { mixed } from 'yup';
import { array, object, string } from 'yup';

import { audioSchema } from '@/validations';
import type { CreateContent } from '@/validations/types/content.validation';

/**
 * Define schema for create category form
 */
export const createContentSchema: ObjectSchema<CreateContent> = object({
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
    languages: string().required('Please select language'),
    tags: array().of(string().required()).min(1, 'Please add at least one tag'),
});
