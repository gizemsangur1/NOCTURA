"use client";

import { useNoteStore } from "@/lib/useNoteStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const slugify = (text: string) => {
  return (
    text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    Date.now()
  );
};

export default function AddNoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addNote } = useNoteStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const markdownImage = `\n\n![uploaded image](${imageUrl})\n\n`;
    setContent((prev) => prev + markdownImage);
  };

  const handleAdd = () => {
    const slug = slugify(title);

    addNote({
      title,
      content,
      slug,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Note</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content (Markdown)"
            fullWidth
            multiline
            minRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
