import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/users';
import type { UserInput } from '@/validations/types/user.validation';

export const updateUser = async (id: string | number, body: UserInput) => {
    try {
        const res = await axios.put<UserProfile>(`/admin/users/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
