import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { DetailResponse } from '@/ts/common';

export const authLogout = async () => {
    try {
        const res = await axios.post<unknown, AxiosResponse<DetailResponse>>(
            `/admin/logout/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
