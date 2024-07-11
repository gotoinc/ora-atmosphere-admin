export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    activity: string;
    job_title?: string;
    company_website?: string;
    phone_number?: string;
}

export interface AdminUser {
    first_name: string;
    last_name: string;
    email: string;
    role: 'super-admin' | 'admin';
}

export type Role = 'super-admin' | 'admin';
