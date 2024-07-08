import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';
import type { CreateTheme } from '@/validations/types/catalog';

export const postTopic = async (body: CreateTheme) => {
    try {
        const res = await axios.postForm<CreateTheme, AxiosResponse<Topic>>(
            `/admin/topics/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
