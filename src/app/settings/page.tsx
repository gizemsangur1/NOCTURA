"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";

export default function SettingsPage() {
  const { user, userData, refreshUserData } = useAuth(); // 👈 refreshUserData alındı
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setName(userData.name || "");
      setSurname(userData.surname || "");
    }
  }, [userData]);

  const handleSave = async () => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      username,
      name,
      surname,
    });

    // 🔁 Güncel verileri yeniden çek
    await refreshUserData();

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          You must be logged in to access settings.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Surname"
          fullWidth
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>

        {success && (
          <Typography color="primary" fontSize={14}>
            Updated successfully.
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
