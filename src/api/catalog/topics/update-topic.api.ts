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
        const res = await axios.patchForm<
            Partial<CreateTheme>,
            AxiosResponse<Topic>
        >(`/admin/topics/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
