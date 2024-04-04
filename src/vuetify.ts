import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import colors from 'vuetify/util/colors';

export default createVuetify({
    components,
    directives,
    theme: {
        // defaultTheme: 'dark',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#FFFFFF',
                    primary: colors.blue.lighten1,
                    secondary: colors.indigo.darken3,
                },
            },
        },
    },
});
