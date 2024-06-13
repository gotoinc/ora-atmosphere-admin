interface CreateCategory {
    name: string;
    background: File | null;
    requires_auth?: boolean;
}

interface CreateGroup extends CreateCategory {
    category: string;
}

interface CreateTheme extends CreateCategory {
    group: string;
}

export type { CreateCategory, CreateGroup, CreateTheme };
