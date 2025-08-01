"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Topbar() {
  const theme = useTheme();

  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const themeBgMap: Record<string, string> = {
    '#b92e34': '/bloodybanner.jpeg',
    '#aaa': '/foggybanner.jpeg',
    '#6a4c93': '/violetbanner.jpeg',
  };

  const primaryColor = theme.palette.primary.main.toLowerCase();
  const bgImage = themeBgMap[primaryColor] || '';

  return (
    <AppBar
      position="fixed"
      sx={{
        left: 240,
        width: `calc(100% - 240px)`,
        boxShadow: "none",
        bgcolor: "transparent",
        borderBottom: "1px solid #2b2b2b",
        zIndex: 1000,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "64px",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Cinzel",
            color: "primary.main",
            letterSpacing: 1,
          }}
        >
          {date}
        </Typography>

        <Box>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
