import { createTheme } from '@mui/material/styles';

export const themes = {
  bloodMoon: createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#1a0000', paper: '#2a0000' },
      primary: { main: '#b92e34' },
      text: { primary: '#f0eaea', secondary: '#b98' },
    },
    typography: { fontFamily: `'Cinzel', 'EB Garamond', serif` },
  }),

  fogGrey: createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#1a1a1a', paper: '#2e2e2e' },
      primary: { main: '#aaa' },
      text: { primary: '#ccc', secondary: '#888' },
    },
    typography: { fontFamily: `'Cinzel', 'EB Garamond', serif` },
  }),

  mourningViolet: createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#110d13', paper: '#1e1723' },
      primary: { main: '#6a4c93' },
      text: { primary: '#e6daff', secondary: '#8b7aa6' },
    },
    typography: { fontFamily: `'Cinzel', 'EB Garamond', serif` },
  }),
};
