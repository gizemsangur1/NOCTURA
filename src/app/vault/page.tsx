"use client";

import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};


export default function VaultPage() {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;
      const notesRef = collection(db, "users", user.uid, "notes");
      const snapshot = await getDocs(notesRef);
      const noteList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];

      setNotes(noteList);
    };

    fetchNotes();
  }, [user]);

  return (
    <>
      <Typography
        color="primary"
        sx={{
          fontFamily: "Cinzel",
          fontWeight: "bold",
          fontSize: "24px",
          mt: 10,
        }}
      >
        WELCOME TO THE VAULT {userData?.name}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3, mt: 3 }}
        onClick={() => router.push("/vault/addNote")}
      >
        + Add Note
      </Button>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid size={{xs:12,md:4}} key={note.id}>
            <Link
              href={`/vault/${note.id}`}
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
                <Typography variant="h6" color="primary">
                  {note.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {note.content}
                </Typography>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
