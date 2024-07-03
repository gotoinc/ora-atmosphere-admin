import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';

export const getGroups = async () => {
    try {
        const res = await axios.get<Group[]>(`/groups`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
