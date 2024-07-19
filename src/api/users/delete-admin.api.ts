import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const deleteAdmin = async (id: string | number) => {
    try {
        const res = await axios.delete(`/admin/users/${id}/delete_admin/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
