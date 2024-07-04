export interface CreateContent {
    title: string;
    file: File | string;
    description?: string;
    audios?: Array<File | string>;
    languages: string;
    tags?: string[];
}
