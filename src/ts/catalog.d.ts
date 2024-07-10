import type { Identifiable } from '@/ts/common';

export interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string | null;
    requiresAuth?: boolean;
    dateCreated: string;
    contentsAmount: number;
}

export interface Category extends CommonCatalogTypes {}

export interface Group extends CommonCatalogTypes {
    category: Identifiable;
}

export interface Topic extends CommonCatalogTypes {
    group: Identifiable;
}

export type CatalogItem = Category | Group | Topic;
