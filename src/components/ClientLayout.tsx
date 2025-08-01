"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeCustom } from "@/context/ThemeContext";
import LayoutShell from "@/components/LayoutShell";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useThemeCustom();

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <LayoutShell>{children}</LayoutShell>
    </ThemeProvider>
  );
}
