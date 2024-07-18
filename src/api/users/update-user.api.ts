import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type {
    CreateAdminSchema,
    UserInput,
} from '@/validations/types/user.validation';

export const updateUser = async (id: string | number, body: UserInput) => {
    try {
        const res = await axios.put<CreateAdminSchema>(
            `/admin/users/${id}/update_admin/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
