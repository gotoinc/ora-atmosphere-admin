import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const postVideo = async (body: ContentInput) => {
    try {
        const res = await axios.postForm<ContentInput>(
            `/admin/videos/create/`,
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
