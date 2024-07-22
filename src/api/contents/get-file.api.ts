import { clenAxios } from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getBlobFile = async (src: string) => {
    try {
        const res = await clenAxios.get<Blob>(src, {
            responseType: 'blob',
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
