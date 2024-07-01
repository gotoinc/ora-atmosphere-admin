import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { DashboardStats } from '@/ts/stats';

export const getDashboardStats = async () => {
    try {
        const res = await axios.get<DashboardStats>(`/admin/dashboard/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
