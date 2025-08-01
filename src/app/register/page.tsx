"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h5" mb={2}>Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && (
          <Typography color="error" fontSize={14} mt={1}>
            {error}
          </Typography>
        )}
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
}
