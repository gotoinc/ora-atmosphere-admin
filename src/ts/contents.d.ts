import type { Identifiable } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description: string;
    file: string;
    image: string;
    languages: Identifiable[];
    topic: Identifiable;
    tags: string[];
    requires_auth: boolean;
    duration: number;
    with_sound: boolean;
    with_narration: boolean;
    date_created: string;
}
