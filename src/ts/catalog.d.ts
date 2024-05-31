import type { VideoContent } from '@/ts/contents';

interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string;
    requires_auth: boolean;
    contents_amount: number;
    date_created: string;
}

export interface Category extends CommonCatalogTypes {
    groups: Group[];
}

export interface Group extends CommonCatalogTypes {
    topics: Topic[];
    category: CategoryBrief;
}

export interface Topic extends CommonCatalogTypes {
    group: CategoryBrief;
    videos: VideoContent[];
}

export type CatalogItem = Category | Group | Topic;

export interface Catalog {
    category: Category;
    groups: Group[];
}

export interface CategoryBrief extends Pick<Category, 'id' | 'name'> {}
