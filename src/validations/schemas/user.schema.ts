import type { ObjectSchema } from 'yup';
import { mixed, object, string } from 'yup';

import type { UserProfile } from '@/ts/users';
import type { Role } from '@/ts/users';
import {
    emailValidation,
    passwordValidation,
    phoneValidation,
} from '@/validations';
import type { CreateAdminSchema } from '@/validations/types/user.validation';

/**
 * Define schema for create admin form
 */
export const createUserSchema: ObjectSchema<CreateAdminSchema> = object({
    first_name: string().required('Please enter first name'),
    last_name: string().required('Please enter last name'),
    email: emailValidation,
    password: passwordValidation,
    role: mixed<Role>()
        .oneOf(
            ['super-admin', 'admin'],
            'Role must be either "super-admin" or "admin"'
        )
        .required('Please select role'),
});

/**
 * Define schema for edit user form
 */
export const editUserSchema: ObjectSchema<Omit<UserProfile, 'id'>> = object({
    first_name: string().required('Please enter first name'),
    last_name: string().required('Please enter last name'),
    email: emailValidation,
    company_name: string().required('Please enter company name'),
    activity: string().required('Please choose activity'),
    job_title: string(),
    company_website: string().url('Please enter a valid URL'),
    phone_number: phoneValidation,
});
