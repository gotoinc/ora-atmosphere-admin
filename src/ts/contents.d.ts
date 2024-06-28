import type { CategoryBrief } from '@/ts/catalog';

export interface Content {
    id: number;
    file_url: string;
    image_url: string;
    title: string;
    topic: CategoryBrief;
    description?: string;
    language: string;
    audio?: string[];
    tags: string[];
    requires_auth: boolean;
    duration: number;
    with_sound: boolean;
    with_narration: boolean;
    date_created: string;
}
