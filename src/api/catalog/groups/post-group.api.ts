import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';
import type { CreateGroup } from '@/validations/types/catalog';

export const postGroup = async (body: CreateGroup) => {
    try {
        const formData = new FormData();

        formData.append('image', body.image as File);
        formData.append('name', body.name);
        formData.append('requires_auth', String(body.requires_auth));
        // formData.append('category_id', String(body.category_id));

        const res = await axios.post<CreateGroup, AxiosResponse<Group>>(
            `/groups/`,
            formData
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
