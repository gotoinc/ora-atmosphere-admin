import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';

export const deleteCategory = async (id: string | number) => {
    try {
        const res = await axios.delete<undefined, AxiosResponse<Category>>(
            `/admin/categories/${id}/delete_category/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
