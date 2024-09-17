import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { CreateAdminSchema } from '@/validations/types/user.validation';

export const postAdmin = async (body: CreateAdminSchema) => {
    try {
        const res = await axios.post<CreateAdminSchema>(
            `/admin/create-user/`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
