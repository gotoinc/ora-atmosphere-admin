import type { ObjectSchema } from 'yup';
import { object, string } from 'yup';

import type { UserProfile } from '@/ts/profile';
import { emailValidation, phoneValidation } from '@/validations';
import type { CreateUser } from '@/validations/types/user';

/**
 * Define schema for create admin form
 */
export const createUserSchema: ObjectSchema<CreateUser> = object({
    email: emailValidation,
    company: string().required('Please enter company name'),
    role: string().required('Please select a role'),
});

/**
 * Define schema for edit user form
 */
export const editUserSchema: ObjectSchema<UserProfile> = object({
    first_name: string().required('Please enter first name'),
    last_name: string().required('Please enter last name'),
    email: emailValidation,
    company_name: string().required('Please enter company name'),
    activity: string().required('Please choose activity'),
    job_title: string(),
    company_website: string().url('Please enter a valid URL'),
    phone_number: phoneValidation,
});
