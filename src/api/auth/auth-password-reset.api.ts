import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const authPasswordReset = async (email: string) => {
    try {
        const res = await axios.post(`/admin/password-reset/`, {
            email,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
