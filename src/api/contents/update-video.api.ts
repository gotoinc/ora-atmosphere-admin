import axios from '@/api/axios.api.ts';
import { setVideoFormdata } from '@/api/contents/set-video-formdata.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const updateVideo = async (id: string | number, body: ContentInput) => {
    try {
        const res = await axios.put<ContentInput>(
            `/admin/videos/${id}/update_video/`,
            setVideoFormdata(body)
        );

        return res.data;
    } catch (err) {
        console.log(err);
        useThrowError(err);
    }
};
