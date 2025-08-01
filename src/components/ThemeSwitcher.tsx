"use client";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useThemeCustom, ThemeKey } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ThemeSwitcher() {
  const { themeName, setThemeName } = useThemeCustom();
  const { user } = useAuth();

  const handleChange = async (value: ThemeKey) => {
    setThemeName(value);

    if (user) {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { themeName: value });
    }
  };

  return (
    <FormControl size="small" variant="standard" sx={{ minWidth: 160 }}>
      <InputLabel sx={{ color: "text.primary" }}>Theme</InputLabel>
      <Select
        value={themeName}
        onChange={(e) => handleChange(e.target.value as ThemeKey)}
        label="Theme"
        sx={{ color: "text.primary" }}
      >
        <MenuItem value="bloodMoon">Bloody Moon</MenuItem>
        <MenuItem value="fogGrey">Fog Grey</MenuItem>
        <MenuItem value="mourningViolet">Mourning Violet</MenuItem>
      </Select>
    </FormControl>
  );
}
