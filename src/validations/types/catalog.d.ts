interface CreateCategory {
    name: string;
    background: string;
}

interface CreateGroup extends CreateCategory {
    category: string;
}

interface CreateTheme extends CreateCategory {
    group: string;
}

export type { CreateCategory, CreateGroup, CreateTheme };
