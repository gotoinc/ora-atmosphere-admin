import type { AdminUser, UserProfile } from '@/ts/users';

export interface CreateAdminSchema extends AdminUser {
    password: string;
}

export interface UserInput extends Omit<UserProfile, 'id'> {}
