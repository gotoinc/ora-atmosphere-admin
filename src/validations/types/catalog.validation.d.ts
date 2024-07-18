import type { Category, Group, Topic } from '@/ts/catalog';
import type { Identifiable } from '@/ts/common';

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
    extends Pick<Group, 'name' | 'requires_auth'> {
    image: File | string;
    category: Identifiable;
}

/**
 * Types for creating theme
 */
export interface TopicInput extends Pick<Topic, 'name' | 'requires_auth'> {
    group_id: number;
    image: File;
}

export interface CreateTopicSchema
    extends Pick<Topic, 'name' | 'requires_auth'> {
    image: File | string;
    group: Identifiable;
}
