import type { Audio, Identifiable } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description?: string;
    file: string;
    image: string;
    language: Identifiable[];
    topic: Identifiable;
    tracks?: Audio[];
    tags: string[];
    requires_auth: boolean;
    duration: number;
    audio: boolean;
    speech: boolean;
    date_created: string;
}
