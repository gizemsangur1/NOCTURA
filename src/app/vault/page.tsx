"use client";

import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useNoteStore } from "@/lib/useNoteStore";
import { useRouter } from "next/navigation";

export default function VaultPage() {
  const { notes } = useNoteStore();
  const router = useRouter();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3, mt: 10 }}
        onClick={() => router.push("/vault/addNote")}
      >
        + Add Note
      </Button>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid size={{ xs: 12, md: 4 }} key={note.slug}>
            <Link
              href={`/vault/${note.slug}`}
              passHref
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#221f1f",
                  padding: "16px",
                  borderRadius: "8px",
                  minHeight: "120px",
                  boxShadow: "0 0 4px #00000080",
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontFamily: "Cinzel",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  {note.title}
                </Typography>
                <Typography color="primary" sx={{ fontSize: "16px" }}>
                  {note.tags?.join(", ") || "untagged"}
                </Typography>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
