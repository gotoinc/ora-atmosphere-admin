import type { Audio, Identifiable } from '@/ts/common';
import type { VideoContent } from '@/ts/contents';

type BooleanValues = Pick<
    VideoContent,
    'requiresAuth' | 'narrationEnabled' | 'audioEnabled'
>;

type EditableValues = Pick<
    VideoContent,
    'title' | 'description' | 'duration' | 'dateCreated' | 'tags'
>;

/**
 * Types for creating category
 */
export interface ContentInput extends EditableValues, Partial<BooleanValues> {
    file: File;
    previewImage: File;
    languages: number;
    audios?: AudioInput[];
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
    previewImage?: File | string;
    description?: string | null;
    audios?: AudioInput[];
    languages: Identifiable;
    tags?: string[];
}

export interface CreateAudio extends Omit<Audio, 'id' | 'video'> {}
