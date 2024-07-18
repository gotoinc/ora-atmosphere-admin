import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';
import type { TopicInput } from '@/validations/types/catalog.validation';

export const postTopic = async (body: TopicInput) => {
    try {
        const res = await axios.postForm<TopicInput, AxiosResponse<Topic>>(
            `/admin/topics/create_topic/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
