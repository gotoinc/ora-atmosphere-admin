interface CreateCategory {
    name: string;
    image: File | string | null;
    requires_auth?: boolean;
}

interface CreateGroup extends CreateCategory {
    // category_id: number;
}

interface CreateTheme extends CreateCategory {
    group_id: number;
}

export type { CreateCategory, CreateGroup, CreateTheme };
