export interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string | null;
    requires_auth: boolean;
    date_created: string;
}

export interface DetailResponse {
    detail: string;
}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}
