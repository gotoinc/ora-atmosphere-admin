import type { Category } from '@/ts/catalog';

export interface SearchFilters {
    categories: Category[];
    langs: string[];
    tags: string[];
}
