interface CreateCategory {
    name: string;
    image: File | string | null;
    requires_auth?: boolean;
    is_active?: boolean;
}

interface CreateGroup extends CreateCategory {
    category: number;
}

interface CreateTheme extends CreateCategory {
    group_id: number;
}

export type { CreateCategory, CreateGroup, CreateTheme };
