import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';

export const deleteGroup = async (id: string | number) => {
    try {
        const res = await axios.delete<undefined, AxiosResponse<Group>>(
            `/admin/groups/${id}/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
