import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';
import type { GroupInput } from '@/validations/types/catalog.validation';

export const updateGroup = async (
    id: string | number,
    body: Partial<GroupInput>
) => {
    try {
        const res = await axios.patchForm<
            Partial<GroupInput>,
            AxiosResponse<Group>
        >(`/admin/groups/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
