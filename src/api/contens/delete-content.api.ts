import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { VideoContent } from '@/ts/contents';

export const deleteContent = async (id: string | number) => {
    try {
        const res = await axios.delete<undefined, AxiosResponse<VideoContent>>(
            `/admin/videos/${id}/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
