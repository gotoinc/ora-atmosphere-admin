import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { CreateAdminSchema } from '@/validations/types/user.validation';

export const postAdmin = async (body: CreateAdminSchema) => {
    try {
        const res = await axios.postForm<CreateAdminSchema>(
            `/admin/users/create_admin/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
