import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export const myTheme = extendTheme({
  // config,
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: 'Kanit',
        // Headers: 'Kanit',
        bgGradient: 'linear(to-br, #D5E5E9, #298292)',
        color: 'blue.400',
      },
    },
    fonts: {
      heading: {
        fontFamily: 'Kanit',
      },
    },
    a: {
      color: 'red.400',
    },
  },
});
