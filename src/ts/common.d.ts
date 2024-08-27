import type { CommonCatalogTypes } from '@/ts/catalog';

export interface DetailResponse {
    detail: string;
}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}

export interface Audio extends Identifiable {
    file: string;
    size: number;
    duration: number;
    language: Identifiable;
}
