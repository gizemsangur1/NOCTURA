"use client";
import {
  ArrowBackIos,
  ArrowForwardIos,
  PauseCircle,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0 5px",
      }}
    >
      <ArrowBackIos />
      <PauseCircle />
      <ArrowForwardIos />
      <MenuIcon onClick={handleOpen} />
      {open && (
        <Grid
          sx={{
            position: "absolute",
            borderRadius: "7px",
            border: "1px solid ",
			borderColor:"text.primary",
            width: "200px",
            height: "250px",
            bottom: 30,
            left: 250,
			padding:"5px",
			justifyContent:"center"
          }}
        >
          A
        </Grid>
      )}
    </Grid>
  );
}
