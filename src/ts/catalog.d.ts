import type { CommonCatalogTypes } from '@/ts/common';
import type { VideoContent } from '@/ts/contents';

export interface Category extends CommonCatalogTypes {
    groups: Group[];
}

export interface Group extends CommonCatalogTypes {
    topics: Topic[];
    category: Category;
}

export interface Topic extends CommonCatalogTypes {
    videos: VideoContent[];
    group: Group;
}

export type CatalogItem = Category | Group | Topic;
