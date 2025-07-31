import { createTheme } from '@mui/material/styles';

export const crtTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0f0f',
      paper: '#111',
    },
    primary: {
      main: '#00ff90',
    },
    text: {
      primary: '#00ff90',
    },
  },
  typography: {
    fontFamily: `'Share Tech Mono', monospace`,
  },
});
