import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/users';

export const getAdminUsers = async () => {
    try {
        const res = await axios.get<UserProfile[]>(`/admin/admin-users/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
