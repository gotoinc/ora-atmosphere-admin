import type { Audio, Identifiable } from '@/ts/common';
import type { VideoContent } from '@/ts/contents';

type BooleanValues = Pick<
    VideoContent,
    'requires_auth' | 'narration_enabled' | 'audio_enabled'
>;

type EditableValues = Pick<
    VideoContent,
    'title' | 'description' | 'duration' | 'date_created' | 'tags'
>;

/**
 * Types for creating category
 */
export interface ContentInput extends EditableValues, Partial<BooleanValues> {
    file: File;
    preview_image: File;
    languages: number[];
    audios?: File[];
    topic: number;
}

export interface AudioInput extends Omit<Audio, 'id' | 'file'> {
    file: File | string;
}

export interface CreateContentSchema
    extends Partial<BooleanValues>,
        Pick<VideoContent, 'topic'> {
    title: string;
    file: File | string;
    preview_image?: File | string;
    description?: string | null;
    audios?: Array<File | string>;
    languages: Identifiable;
    tags?: string[];
}

export interface CreateAudio extends Omit<Audio, 'id' | 'video'> {}
