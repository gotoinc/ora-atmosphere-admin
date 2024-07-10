import type { Category, Group, Topic } from '@/ts/catalog';

/**
 * Types for creating category
 */
export interface CategoryInput extends Pick<Category, 'name' | 'requiresAuth'> {
    image: File;
}

export interface CreateCategorySchema
    extends Pick<Category, 'name' | 'requiresAuth'> {
    image: File | string;
}

/**
 * Types for creating group
 */
export interface GroupInput extends Pick<Category, 'name' | 'requiresAuth'> {
    image: File;
    category: number;
}

export interface CreateGroupSchema
    extends Pick<Group, 'name' | 'requiresAuth' | 'category'> {
    image: File | string;
}

/**
 * Types for creating theme
 */
export interface TopicInput extends Pick<Topic, 'name' | 'requiresAuth'> {
    group: number;
    image: File;
}

export interface CreateTopicSchema
    extends Pick<Topic, 'name' | 'requiresAuth' | 'group'> {
    image: File | string;
}
