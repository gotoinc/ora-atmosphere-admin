import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';
import type { CreateGroup } from '@/validations/types/catalog';

export const postGroup = async (body: CreateGroup) => {
    try {
        const res = await axios.postForm<CreateGroup, AxiosResponse<Group>>(
            `/admin/groups/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
