"use client";
import { Grid, Typography, useTheme } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import TypingText from "@/components/TypingText";
import Image from "next/image";

export default function Home() {
  const { userData } = useAuth();
  const theme = useTheme();
    const themeBgMap: Record<string, string> = {
    "#b92e34": "/mainbloody.jpeg",
    "#aaa": "/foggySidebar.jpeg",
    "#6a4c93": "/mainviolet.jpeg",
  };
  const primaryColor = theme.palette.primary.main.toLowerCase();
  const bgImage = themeBgMap[primaryColor] || "";

  return (
    <Grid
      container
      direction="row"
      sx={{ marginTop: 4, textAlign: "center", width: "100%", height: "100%" }}
    >
      <Grid size={3} sx={{display:"flex",alignItems:"center"}}></Grid>
      <Grid size={6} sx={{marginTop:6}}>
        <Typography sx={{ fontSize: "24px" }}>
          WELCOME TO THE NΘCTURA {" " + userData?.name}
        </Typography>
        {userData && (
          <Typography sx={{ fontSize: "18px", mt: 2 }}>
            <TypingText text="WANT TO START YOUR JOURNEY ?" />
          </Typography>
        )}
      </Grid>
     <Grid size={3} sx={{display:"flex",alignItems:"center"}}>
     </Grid>
    </Grid>
  );
}
