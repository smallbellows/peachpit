import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const overrides = {
    colors: {
        teal: {
            50: '#defdf7',
            100: '#bbf1e8',
            200: '#95e6d8',
            300: '#6edbc9',
            400: '#48d0b9',
            500: '#2fb79f',
            600: '#1f8e7c',
            700: '#116759',
            800: '#023e35',
            900: '#001713',
        },
        red: {
            50: '#ffe7eb',
            100: '#f6bcc5',
            200: '#ed909f',
            300: '#e6667a',
            400: '#df3c54',
            500: '#c6243b',
            600: '#9a1b2d',
            700: '#6e1321',
            800: '#430913',
            900: '#1a0105',
        },
    },
    fonts: {
        heading: "'Dancing Script', cursive",
        body: "'Volkhov', serif",
    },
    styles: {
        global: {
            'html, body': {
                background: 'red.50',
            },
        },
    },
    components: {
        Divider: {
            sizes: {
                md: {
                    borderBottomWidth: '2px',
                    borderColor: 'teal.400',
                },
            },
        },
        Heading: {
            baseStyle: {
                color: 'teal.700',
            },
        },
    },
};
const theme = extendTheme(
    overrides,
    withDefaultColorScheme({ colorScheme: 'teal', components: ['Button'] })
);
export { theme };
