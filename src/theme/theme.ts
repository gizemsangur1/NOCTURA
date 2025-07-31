import { createTheme } from '@mui/material/styles';

export const gothicTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1515',     // dusty blood brown/black
      paper: '#221f1f',        // old book dark gray
    },
    primary: {
      main: '#b92e34',         // blood red
    },
    secondary: {
      main: '#6a4c93',         // faded purple
    },
    text: {
      primary: '#e0e0e0',      // bone white
      secondary: '#888',
    },
  },
  typography: {
    fontFamily: `'Cinzel', 'EB Garamond', 'serif'`,
  },
});
