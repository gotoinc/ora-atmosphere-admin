import type { VideoContent } from '@/ts/contents';

export interface DashboardStats {
    latest_videos: VideoContent[];
    total_admins: number;
    total_super_admins: number;
    total_users: number;
    total_videos: number;
}
