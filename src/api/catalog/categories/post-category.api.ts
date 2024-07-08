import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';
import type { CreateCategory } from '@/validations/types/catalog';

export const postCategories = async (body: CreateCategory) => {
    try {
        const res = await axios.postForm<
            CreateCategory,
            AxiosResponse<Category>
        >(`/admin/categories/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
