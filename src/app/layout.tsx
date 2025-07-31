'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { gothicTheme } from '@/theme/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel&family=EB+Garamond&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={gothicTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
