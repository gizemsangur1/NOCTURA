"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import {
  DoorBackRounded,
  LoginRounded,
  LogoutRounded,
} from "@mui/icons-material";
import MusicPlayer from "./MusicPlayer";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const themeBgMap: Record<string, string> = {
    "#b92e34": "/bloodySidebar.jpeg",
    "#aaa": "/foggySidebar.jpeg",
    "#6a4c93": "/violetSidebar.jpeg",
  };
  const primaryColor = theme.palette.primary.main.toLowerCase();
  const bgImage = themeBgMap[primaryColor] || "";

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        bgcolor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        position: "fixed",
        top: 0,
        left: 0,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          fontFamily: "Cinzel",
          fontSize: "1.4rem",
          color: theme.palette.primary.main,
          mb: 4,
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        NOCTURA
      </Box>

      <List disablePadding>
        <Link href="/vault" passHref style={{ textDecoration: "none" }}>
          <ListItemButton
            selected={pathname.startsWith("/vault")}
            sx={{
              color: theme.palette.text.primary,
              borderRadius: 1,
              "&.Mui-selected": {
                bgcolor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Vault" />
          </ListItemButton>
        </Link>
        <Link href="/photoBooth" passHref style={{ textDecoration: "none" }}>
          <ListItemButton
            selected={pathname.startsWith("/photoBooth")}
            sx={{
              color: theme.palette.text.primary,
              borderRadius: 1,
              "&.Mui-selected": {
                bgcolor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Photo Booth" />
          </ListItemButton>
        </Link>

        {user ? (
          <>
            <Link href="/settings" passHref style={{ textDecoration: "none" }}>
              <ListItemButton
                selected={pathname.startsWith("/settings")}
                sx={{
                  color: theme.palette.text.primary,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    bgcolor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </Link>

            <ListItemButton
              onClick={handleLogout}
              sx={{
                color: theme.palette.text.primary,
                borderRadius: 1,
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <LogoutRounded />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        ) : (
          <>
            <Link href="/login" passHref style={{ textDecoration: "none" }}>
              <ListItemButton
                selected={pathname.startsWith("/login")}
                sx={{
                  color: theme.palette.text.primary,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    bgcolor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <LoginRounded />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </Link>

            <Link href="/register" passHref style={{ textDecoration: "none" }}>
              <ListItemButton
                selected={pathname.startsWith("/register")}
                sx={{
                  color: theme.palette.text.primary,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    bgcolor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <DoorBackRounded />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </Link>
          </>
        )}
      </List>

      <Image width={200} height={200} src={bgImage} alt="sidebar" />
      {/*    <MusicPlayer /> */}
    </Box>
  );
}
