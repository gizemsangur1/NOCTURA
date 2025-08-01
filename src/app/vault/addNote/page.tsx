"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddNotePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!user) return;

    await addDoc(collection(db, "users", user.uid, "notes"), {
      title,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    router.push("/vault"); 
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        New Note
      </Typography>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Content"
        fullWidth
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ mt: 2 }}
        disabled={!title.trim()}
      >
        Save Note
      </Button>
    </Box>
  );
}
