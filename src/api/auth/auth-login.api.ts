import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { SignInInput } from '@/validations/types/auth';

interface LoginSuccessResponse {
    token: string;
}

export const authLogin = async (body: SignInInput) => {
    try {
        const res = await axios.post<
            SignInInput,
            AxiosResponse<LoginSuccessResponse>
        >(`/admin/login/`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
