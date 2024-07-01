import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';
import type { CreateTheme } from '@/validations/types/catalog';

export const updateTopic = async (
    id: string | number,
    body: Partial<CreateTheme>
) => {
    try {
        const formData = new FormData();

        if (body.image) {
            formData.append('image', body.image);
        }

        if (body.name) {
            formData.append('name', body.name);
        }

        if (body.group_id) {
            formData.append('group_id', String(body.group_id));
        }

        formData.append('requires_auth', String(!!body.requires_auth));

        const res = await axios.patch<
            Partial<CreateTheme>,
            AxiosResponse<Topic>
        >(`/admin/topics/${id}/`, formData);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
