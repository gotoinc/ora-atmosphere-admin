import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';

export const deleteTopic = async (id: string | number) => {
    try {
        const res = await axios.delete<undefined, AxiosResponse<Topic>>(
            `/topics/${id}/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
