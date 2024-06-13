import type { RegisterInput } from '@/validations/types/auth';

export interface UserProfile
    extends Omit<
        RegisterInput,
        'agree_with_terms' | 'password' | 'confirm_password' | 'recaptcha_token'
    > {}

export interface AdminUser {
    first_name: string;
    last_name: string;
    email: string;
    company: string;
    role: 'admin' | 'super admin';
}