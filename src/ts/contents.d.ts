export interface VideoContent {
    id: number;
    title: string;
    description: string;
    file: string;
    image: string;
    languages: Language[];
    audio?: string[];
    tags: string[];
    requires_auth: boolean;
    duration: number;
    with_sound: boolean;
    with_narration: boolean;
    date_created: string;
}

export interface Language {
    id: number;
    name: string;
}
