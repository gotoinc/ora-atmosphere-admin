import type { VideoContent } from '@/ts/contents';

type PartialContentKeys = 'tags' | 'requires_auth' | 'audio' | 'speech';

type OmitContentKeys =
    | 'id'
    | 'topic'
    | 'image'
    | 'date_created'
    | 'audio'
    | 'language'
    | PartialContentKeys;

export interface CreateContent
    extends Omit<VideoContent, OmitContentKeys>,
        Partial<Pick<VideoContent, PartialContentKeys>> {
    topic_id: number;
    language: string;
}
