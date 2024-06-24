import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';
import type { CreateCategory } from '@/validations/types/catalog';

export const postCategories = async (body: CreateCategory) => {
    try {
        const formData = new FormData();

        formData.append('image', body.image as File);
        formData.append('name', body.name);
        formData.append('requires_auth', String(body.requires_auth));

        const res = await axios.post<CreateCategory, AxiosResponse<Category>>(
            `/categories/`,
            formData
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
