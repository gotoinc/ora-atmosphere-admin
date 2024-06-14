export interface AdminUser {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    role: string;
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
