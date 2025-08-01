"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutShell from "@/components/LayoutShell";
import { ThemeProviderCustom, useThemeCustom } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

function ThemedApp({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useThemeCustom();
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <LayoutShell>{children}</LayoutShell>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel&family=EB+Garamond&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProviderCustom>
            <ThemedApp>{children}</ThemedApp>
          </ThemeProviderCustom>
        </AuthProvider>
      </body>
    </html>
  );
}
