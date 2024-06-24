import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';
import type { CreateCategory } from '@/validations/types/catalog';

export const updateCategory = async (
    id: string | number,
    body: Partial<CreateCategory>
) => {
    try {
        const formData = new FormData();

        if (body.image) {
            formData.append('image', body.image);
        }

        if (body.name) {
            formData.append('name', body.name);
        }

        formData.append('requires_auth', String(!!body.requires_auth));

        const res = await axios.patch<
            Partial<CreateCategory>,
            AxiosResponse<Category>
        >(`/categories/${id}/`, formData);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
