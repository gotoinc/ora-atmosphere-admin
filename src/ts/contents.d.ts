import type { Audio, Identifiable, VideoFile } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description?: string | null;
    video_files: VideoFile[];
    requires_auth: boolean;
    preview_image?: string;
    audio_enabled: boolean;
    is_realtime: boolean;
    narration_enabled: boolean;
    language?: Identifiable;
    duration: number;
    date_created?: string;
    topic: Identifiable;
    audios?: Audio[];
    tags?: string;
}
