import type { CommonCatalogTypes } from '@/ts/catalog';

export interface DetailResponse {
    detail: string;
}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}

export interface Audio extends Identifiable {
    file: File;
    size: number;
    duration: number;
}
