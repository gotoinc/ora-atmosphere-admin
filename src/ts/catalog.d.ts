export interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string | null;
    requires_auth: boolean;
    is_active: boolean;
}

export interface Category extends CommonCatalogTypes {
    groups: Group[];
}

export interface Group extends CommonCatalogTypes {
    topics: Topic[];
    category: Category;
}

export interface Topic extends CommonCatalogTypes {
    group: Group;
}

export type CatalogItem = Category | Group | Topic;
