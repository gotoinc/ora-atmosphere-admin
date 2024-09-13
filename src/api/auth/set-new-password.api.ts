import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { DetailResponse } from '@/ts/common';

interface SetNewPasswordInput {
    new_password: string;
    token: string;
    uid: string;
}

export const setNewPassword = async (body: SetNewPasswordInput) => {
    try {
        const res = await axios.post<
            SetNewPasswordInput,
            AxiosResponse<DetailResponse>
        >(`/admin/password-reset-confirm/`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
