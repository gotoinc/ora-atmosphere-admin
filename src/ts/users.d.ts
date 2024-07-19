export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    activity: string;
    job_title?: string | null;
    company_website?: string | null;
    phone_number?: string | null;
}

export interface AdminUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'super-admin' | 'admin';
}

export type Role = 'super-admin' | 'admin';
