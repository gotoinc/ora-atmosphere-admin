import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { AdminUser } from '@/ts/users';

export const getProfile = async () => {
    try {
        const res = await axios.get<AdminUser>(`/admin/profile/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
