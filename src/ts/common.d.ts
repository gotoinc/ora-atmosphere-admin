import type { CommonCatalogTypes } from '@/ts/catalog';

export interface DetailResponse {
    detail: string;
}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}

export interface Audio {
    id: number;
    file: string;
    size: number;
    duration: number;
    language: Identifiable;
}

export interface VideoFile {
    file: File | string;
    language: Identifiable;
}
