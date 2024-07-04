import type { Topic } from '@/ts/catalog';
import type { Audio, Identifiable } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description?: string;
    file: string;
    languages: Identifiable;
    requires_auth: boolean;
    image: string;
    audio_enabled: boolean;
    narration_enabled: boolean;
    show_on_main_banner: boolean;
    visible_for_unregistered: boolean;
    duration: number;
    date_created: string;
    topic: Topic;
    audios?: Audio[];
    tags: string;
}
