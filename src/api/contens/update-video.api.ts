import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const updateVideo = async (
    id: string | number,
    body: Partial<ContentInput>
) => {
    try {
        const res = await axios.patchForm<ContentInput>(
            `/admin/videos/${id}/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
