import type { Audio, Identifiable } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description?: string | null;
    file: string;
    languages: Identifiable[];
    requires_auth: boolean;
    preview_image: string;
    audio_enabled: boolean;
    narration_enabled: boolean;
    duration: number;
    date_created?: string;
    topic: Identifiable;
    audios?: Audio[];
    tags?: string;
}
