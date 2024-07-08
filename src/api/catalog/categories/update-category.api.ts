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
        const res = await axios.patchForm<
            Partial<CreateCategory>,
            AxiosResponse<Category>
        >(`/admin/categories/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
