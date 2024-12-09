import type { Audio, Identifiable, VideoFile } from '@/ts/common';
import type { VideoContent } from '@/ts/contents';

type BooleanValues = Pick<
    VideoContent,
    'requires_auth' | 'narration_enabled' | 'audio_enabled' | 'is_realtime'
>;

type EditableValues = Pick<
    VideoContent,
    'title' | 'description' | 'duration' | 'date_created' | 'tags'
>;

/**
 * Types for creating category
 */
export interface ContentInput extends EditableValues, Partial<BooleanValues> {
    video_files: VideoFile[];
    new_video_files?: VideoFile[];
    video_files_to_delete?: number[];
    preview_image: File;
    audios?: CreateAudio[];
    topic: number;
    image?: string;
}

export interface CreateContentSchema
    extends Partial<BooleanValues>,
        Pick<VideoContent, 'topic'> {
    title: string;
    video_files: VideoFile[];
    preview_image?: File | string;
    description?: string | null;
    audios?: CreateAudio[];
    tags?: string[];
}

export interface CreateAudio extends Pick<Audio, 'duration' | 'size'> {
    file: File | string;
    id?: number;
    language: Identifiable;
}
