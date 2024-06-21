import type { CommonCatalogTypes, Identifiable } from '@/ts/common';
import type { VideoContent } from '@/ts/contents';

export interface Category extends CommonCatalogTypes {
    groups: Group[];
}

export interface Group extends CommonCatalogTypes {
    topics: Topic[];
    category: Identifiable;
}

export interface Topic extends CommonCatalogTypes {
    videos: VideoContent[];
    group: Identifiable;
}

export type CatalogItem = Category | Group | Topic;
