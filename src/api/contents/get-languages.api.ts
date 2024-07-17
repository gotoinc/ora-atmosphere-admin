import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Identifiable } from '@/ts/common';

export const getLanguages = async () => {
    try {
        const res = await axios.get<Identifiable[]>(`/languages/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
