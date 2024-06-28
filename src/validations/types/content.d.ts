import type { Content } from '@/ts/contents';

type PartialContentKeys =
    | 'tags'
    | 'requires_auth'
    | 'with_sound'
    | 'with_narration';

type OmitContentKeys =
    | 'id'
    | 'topic'
    | 'image_url'
    | 'date_created'
    | 'audio'
    | PartialContentKeys;

export interface CreateContent
    extends Omit<Content, OmitContentKeys>,
        Partial<Pick<Content, PartialContentKeys>> {
    topic_id: number;
    audio: File[];
}
