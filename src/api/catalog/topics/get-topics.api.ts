import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';

export const getTopics = async () => {
    try {
        const res = await axios.get<Topic[]>(`/topics/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
