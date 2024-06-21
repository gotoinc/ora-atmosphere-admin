import type { RegisterInput } from '@/validations/types/auth';

export interface UserProfile
    extends Omit<
        RegisterInput,
        'agree_with_terms' | 'password' | 'confirm_password' | 'recaptcha_token'
    > {}
