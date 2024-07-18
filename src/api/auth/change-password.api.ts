import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { DetailResponse } from '@/ts/common';
import type { SetNewPasswordType } from '@/validations/types/auth';

export const changePassword = async (body: SetNewPasswordType) => {
    try {
        const res = await axios.post<
            SetNewPasswordType,
            AxiosResponse<DetailResponse>
        >(`/auth/password/change/`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
