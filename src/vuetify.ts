import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';

// eslint-disable-next-line no-restricted-imports
import tailwindConfig from '../tailwind.config.ts';

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                variables: {},
                colors: {
                    background: tailwindConfig.theme.extend.colors.dark,
                    // surface: '#fff',
                    primary: tailwindConfig.theme.extend.colors.primary['100'],
                    red: tailwindConfig.theme.extend.colors.error,
                },
            },
        },
    },
});
