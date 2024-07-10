import type { Audio, Identifiable } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description?: string | null;
    file: string;
    languages: Identifiable;
    requiresAuth: boolean;
    previewImage: string;
    audioEnabled: boolean;
    narrationEnabled: boolean;
    duration: number;
    dateCreated: string;
    topic: Identifiable;
    audios?: Audio[];
    tags?: string;
}
