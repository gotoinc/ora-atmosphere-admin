import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { AdminUser, UserProfile } from '@/ts/users';

interface UpdateProfileInput extends Omit<AdminUser, 'id'> {}

export const updateProfile = async (
    id: string | number,
    body: UpdateProfileInput
) => {
    try {
        const res = await axios.put<UserProfile>(`/users/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
