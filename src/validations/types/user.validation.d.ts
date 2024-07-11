import type { AdminUser } from '@/ts/users';

export interface CreateAdminSchema extends AdminUser {
    password: string;
}
