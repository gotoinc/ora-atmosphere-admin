import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { VideoContent } from '@/ts/contents';

export const getTopicContents = async (topicId: string | number) => {
    try {
        const res = await axios.get<VideoContent[]>(
            `/admin/videos/${topicId}/videos/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
