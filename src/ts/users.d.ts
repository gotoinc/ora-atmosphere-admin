export interface AdminUser {
    email: string;
    company: string;
    role: 'admin' | 'super admin';
}

export interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    activity: string;
    job_title?: string;
    company_website?: string;
    phone_number?: string;
}
