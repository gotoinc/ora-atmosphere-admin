import type { Topic } from '@/ts/catalog';
import type { Audio, Identifiable } from '@/ts/common';
import type { VideoContent } from '@/ts/contents';

type BooleanKeys =
    | 'requires_auth'
    | 'narration_enabled'
    | 'audio_enabled'
    | 'show_on_main_banner'
    | 'visible_for_unregistered';

type PickBooleanValues = Pick<VideoContent, BooleanKeys>;

type OmitContent = Omit<
    VideoContent,
    'id' | 'file' | 'languages' | 'image' | 'audios' | 'topic' | BooleanKeys
>;

export interface CreateContentSchema extends Partial<PickBooleanValues> {
    title: string;
    file: File | string;
    description?: string;
    audios?: CreateAudio[];
    languages: Identifiable;
    tags?: string[];
    topic: Topic;
}

export interface ContentInput extends OmitContent, Partial<PickBooleanValues> {
    file: File;
    languages: number;
    audios?: CreateAudio[];
    topic: number;
}

export interface CreateAudio extends Omit<Audio, 'id' | 'video'> {}
