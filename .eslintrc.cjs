module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'prettier',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/strict-type-checked',
    ],
    overrides: [],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
            js: '@typescript-eslint/parser',
            ts: '@typescript-eslint/parser',
            '<template>': 'espree',
        },
        extraFileExtensions: ['.pcss', '.vue'],
        ecmaVersion: 2015,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
    rules: {
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/unified-signatures': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/array-type': [
            'error',
            { default: 'array-simple', readonly: 'array-simple' },
        ],
        '@typescript-eslint/prefer-optional-chain': 'error',
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'require-await': 'off',
        'no-prototype-builtins': 'off',
        '@typescript-eslint/require-await': 'error',
        'default-param-last': ['error'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: ['../'],
            },
        ],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
            },
            {
                selector: ['interface', 'typeAlias'],
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: false,
                },
            },
            {
                selector: ['variable', 'function'],
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: ['variable'],
                format: ['camelCase', 'UPPER_CASE'],
                modifiers: ['const'],
                leadingUnderscore: 'allow',
            },
        ],
        'vue/require-default-prop': 'off',
        'vue/no-v-model-argument': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 0,
        'vue/component-name-in-template-casing': [
            'error',
            'kebab-case',
            {
                registeredComponentsOnly: true,
            },
        ],
        'vue/block-lang': [
            'error',
            {
                script: {
                    lang: 'ts',
                },
            },
        ],
        'vue/define-props-declaration': ['error', 'type-based'],
        'vue/new-line-between-multi-line-property': [
            'error',
            {
                minLineOfMultilineProperty: 4,
            },
        ],
        'vue/padding-line-between-tags': [
            'error',
            [{ blankLine: 'always', prev: '*', next: '*' }],
        ],
        'vue/no-parsing-error': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Packages `Vue` related packages come first.
                    ['^vue', '^@?\\w'],
                    // Components
                    ['^@/components?\\w'],
                    // Enums
                    ['^@/ts/enums?\\w'],
                    // Interfaces
                    ['^@/ts/interfaces?\\w'],
                    // Utils
                    ['^@/utils?\\w'],
                    // Store
                    ['^pinia', '^@/stores?\\w'],
                    // Absolute imports and other imports such as Vue-style `@/foo`.
                    // Anything not matched in another group.
                    ['^'],
                    // Relative imports.
                    // Anything that starts with a dot.
                    ['^\\.'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
    },
    root: true,
};
