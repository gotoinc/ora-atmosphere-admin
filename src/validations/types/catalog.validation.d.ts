import type { Category, Group, Topic } from '@/ts/catalog';

/**
 * Types for creating category
 */
export interface CategoryInput
    extends Pick<Category, 'name' | 'requires_auth'> {
    image: File;
}

export interface CreateCategorySchema
    extends Pick<Category, 'name' | 'requires_auth'> {
    image: File | string;
}

/**
 * Types for creating group
 */
export interface GroupInput extends Pick<Category, 'name' | 'requires_auth'> {
    image: File;
    category: number;
}

export interface CreateGroupSchema
    extends Pick<Group, 'name' | 'requires_auth' | 'category'> {
    image: File | string;
}

/**
 * Types for creating theme
 */
export interface TopicInput extends Pick<Topic, 'name' | 'requires_auth'> {
    group: number;
    image: File;
}

export interface CreateTopicSchema
    extends Pick<Topic, 'name' | 'requires_auth' | 'group'> {
    image: File | string;
}
