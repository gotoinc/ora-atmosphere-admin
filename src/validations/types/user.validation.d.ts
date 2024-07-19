import type { AdminUser, Role, UserProfile } from '@/ts/users';

export interface CreateAdminSchema extends Omit<AdminUser, 'id'> {
    password: string;
}

export interface UserInput extends Omit<UserProfile, 'id'> {
    role: Role;
}
