"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";

export default function NoteDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const [note, setNote] = useState<{ title: string; content: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const router=useRouter();

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  useEffect(() => {
    if (!user || !slug) return;

    const fetchNote = async () => {
      const ref = doc(db, "users", user.uid, "notes", slug);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as { title: string; content: string };
        setNote(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } else {
        setNote(null);
      }
      setLoading(false);
    };

    fetchNote();
  }, [slug, user]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "notes", slug);
    await deleteDoc(ref);
    router.push("/vault");
  };

  const handleEdit = () => {
    setEditMode(true);
    setOpen(false);
  };

  const handleSave = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "notes", slug);
    await updateDoc(ref, {
      title: editedTitle,
      content: editedContent,
      updatedAt: new Date(),
    });
    setNote({ title: editedTitle, content: editedContent });
    setEditMode(false);
  };

  if (loading) return null;
  if (!note) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {editMode ? (
          <TextField
            variant="standard"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ fontSize: "1.8rem" }}
          />
        ) : (
          <Typography variant="h4" color="primary" gutterBottom>
            {note.title}
          </Typography>
        )}
        {!editMode && (
          <>
            <MoreVertIcon onClick={handleOpen} />
            {open && (
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "7px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "absolute",
                  right: 30,
                  top: 40,
                  padding: "15px",
                  backgroundColor: "background.paper",
                }}
              >
                <DeleteOutline
                  sx={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={handleDelete}
                />
                <EditNoteOutlined
                  sx={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={handleEdit}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {editMode ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{ mt: 3 }}
          />
          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </>
      ) : (
        <Box
          sx={{
            mt: 2,
            backgroundColor: "#1a1a1a",
            p: 3,
            borderRadius: 2,
            border: "1px solid #2b2b2b",
            fontFamily: `'EB Garamond', serif`,
            fontSize: "1.1rem",
            color: "#e0e0e0",
            lineHeight: 1.7,
            "& img": {
              maxWidth: "100%",
              borderRadius: "4px",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </Box>
      )}
    </Container>
  );
}
