import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';
import type { TopicInput } from '@/validations/types/catalog.validation';

export const updateTopic = async (
    id: string | number,
    body: Partial<TopicInput>
) => {
    try {
        const res = await axios.patchForm<
            Partial<TopicInput>,
            AxiosResponse<Topic>
        >(`/admin/topics/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
