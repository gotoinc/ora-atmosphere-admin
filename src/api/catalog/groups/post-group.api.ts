import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';
import type { GroupInput } from '@/validations/types/catalog.validation';

export const postGroup = async (body: GroupInput) => {
    try {
        const res = await axios.postForm<GroupInput, AxiosResponse<Group>>(
            `/admin/groups/create_group/`,
            body
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
