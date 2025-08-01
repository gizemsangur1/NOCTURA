"use client";

import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const theme = useTheme();
  const router=useRouter();

  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const themeBgMap: Record<string, string> = {
    "#b92e34": "/bloodyBanner3.jpeg",
    "#aaa": "/foggybanner.jpeg",
    "#6a4c93": "/violetbanner.jpeg",
  };

  const primaryColor = theme.palette.primary.main.toLowerCase();
  const bgImage = themeBgMap[primaryColor] || "";

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
        <Box sx={{width:"100%",display:"flex"}}>
          <ArrowBack style={{ fontSize: "18px",marginRight:"15px",color:"text.primary",cursor:"pointer" }} onClick={()=>router.back()}/>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "Cinzel",
              color: "text.primary",
              letterSpacing: 1,
            }}
          >
            {date}
          </Typography>
        </Box>

        <Box>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
