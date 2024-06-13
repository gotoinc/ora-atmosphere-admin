import type { ObjectSchema } from 'yup';
import { object, string } from 'yup';

import { emailValidation } from '@/validations';
import type { CreateUser } from '@/validations/types/user';

/**
 * Define schema for create category form
 */
export const createUserSchema: ObjectSchema<CreateUser> = object({
    email: emailValidation,
    company: string().required('Please enter company name'),
    role: string().required('Please select a role'),
});
