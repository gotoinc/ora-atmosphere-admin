export interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string | null;
    requires_auth: boolean;
}

export interface DetailResponse {
    detail: string;
}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}
