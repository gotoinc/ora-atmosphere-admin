import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';

export const getCategories = async () => {
    try {
        const res = await axios.get<Category[]>(`/categories`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
