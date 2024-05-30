import type { TopicBrief } from '@/ts/catalog';

export interface Content {
    id: number;
    file_url: string;
    image_url: string;
    title: string;
    topic: TopicBrief;
    description?: string;
    languages: string[];
    tags: string[];
    requires_auth: boolean;
    duration: number;
    with_sound: boolean;
    with_narration: boolean;
    date_created: string;
}
