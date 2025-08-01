"use client";

import { notFound, useParams } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function NoteDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const [note, setNote] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = typeof params.slug === "string"
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
        setNote(snap.data() as { title: string; content: string });
      } else {
        setNote(null);
      }
      setLoading(false);
    };

    fetchNote();
  }, [slug, user]);

  if (loading) return null;
  if (!note) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        {note.title}
      </Typography>
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
    </Container>
  );
}
