import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';
import type { CreateTheme } from '@/validations/types/catalog';

export const postTopic = async (body: CreateTheme) => {
    try {
        const formData = new FormData();

        formData.append('image', body.image as File);
        formData.append('name', body.name);
        formData.append('requires_auth', String(body.requires_auth));
        formData.append('group_id', String(body.group_id));

        const res = await axios.post<CreateTheme, AxiosResponse<Topic>>(
            `/admin/topics/`,
            formData
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
