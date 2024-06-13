import type { VideoContent } from '@/ts/contents';

type PartialContentKeys =
    | 'tags'
    | 'requires_auth'
    | 'with_sound'
    | 'with_narration';

type OmitContentKeys =
    | 'id'
    | 'topic'
    | 'image'
    | 'date_created'
    | PartialContentKeys;

export interface CreateContent
    extends Omit<VideoContent, OmitContentKeys>,
        Partial<Pick<VideoContent, PartialContentKeys>> {
    topic_id: number;
}
