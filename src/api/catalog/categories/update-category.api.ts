import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';
import type { CategoryInput } from '@/validations/types/catalog.validation';

export const updateCategory = async (
    id: string | number,
    body: Partial<CategoryInput>
) => {
    try {
        const res = await axios.patchForm<
            Partial<CategoryInput>,
            AxiosResponse<Category>
        >(`/admin/categories/${id}/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
