export interface VideoContent {
    id: number;
    title: string;
    description: string;
    file: string;
    languages: Language[];
    tags: string[];
    requires_auth: boolean;
}

export interface Language {
    id: number;
    name: string;
}
