import type { Content } from '@/ts/contents';

export interface DashboardStats {
    latest_videos: Content[];
    total_admins: number;
    total_super_admins: number;
    total_users: number;
    total_videos: number;
}
