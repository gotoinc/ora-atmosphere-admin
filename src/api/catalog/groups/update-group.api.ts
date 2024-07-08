import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';
import type { CreateGroup } from '@/validations/types/catalog';

export const updateGroup = async (
    id: string | number,
    body: Partial<CreateGroup>
) => {
    try {
        const res = await axios.patchForm<
            Partial<CreateGroup>,
            AxiosResponse<Group>
        >(`/admin/groups/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
