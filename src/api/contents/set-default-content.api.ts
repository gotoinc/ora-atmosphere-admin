import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { VideoContent } from '@/ts/contents';

export const setDefaultContent = async (id: number) => {
    try {
        const res = await axios.post<AxiosResponse<VideoContent>>(
            `/admin/videos/set_default_video/`,
            {
                video_id: id,
            }
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
