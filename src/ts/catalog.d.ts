export interface Category {
    id: number;
    name: string;
    image_url: string;
    requires_auth: boolean;
}

export interface Group {
    id: number;
    name: string;
    image_url: string;
    category_id: number;
    requires_auth: boolean;
}

export interface Topic {
    id: number;
    name: string;
    image_url: string;
    group_id: number;
    requires_auth: boolean;
}

export interface Catalog {
    category: Category;
    groups: Group[];
}

export interface TopicBrief extends Pick<Topic, 'id' | 'name'> {}
