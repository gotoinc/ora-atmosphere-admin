import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';
import type { CategoryInput } from '@/validations/types/catalog.validation';

export const postCategories = async (body: CategoryInput) => {
    try {
        const res = await axios.postForm<
            CategoryInput,
            AxiosResponse<Category>
        >(`/admin/categories/create_category/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
