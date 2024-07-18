import type { Identifiable } from '@/ts/common';

export interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string | null;
    requires_auth?: boolean;
    date_created: string;
    contents_amount: number;
}

export interface Category extends CommonCatalogTypes {}

export interface Group extends CommonCatalogTypes {
    category: Identifiable;
}

export interface Topic extends CommonCatalogTypes {
    group: Identifiable;
}

export type CatalogItem = Category | Group | Topic;
