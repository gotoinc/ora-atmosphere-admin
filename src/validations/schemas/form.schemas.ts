import type { ObjectSchema } from 'yup';
import { object, string } from 'yup';

import type { LoginForm } from '@/validations/types/forms';

export const loginSchema: ObjectSchema<LoginForm> = object({
    email: string().required('Please enter email').email(),
    password: string().required('Please enter password'),
});
