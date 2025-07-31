'use client';

import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useThemeCustom } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { themeName, setThemeName } = useThemeCustom();

  return (
    <FormControl size="small" variant="standard" sx={{ minWidth: 160 }}>
      <InputLabel sx={{ color: 'text.primary' }}>Theme</InputLabel>
      <Select
        value={themeName}
        onChange={(e) => setThemeName(e.target.value as any)}
        label="Theme"
        sx={{ color: 'text.primary' }}
      >
        <MenuItem value="bloodMoon">Bloody Moon</MenuItem>
        <MenuItem value="fogGrey">Fog Grey</MenuItem>
        <MenuItem value="mourningViolet">Mourning Violet</MenuItem>
      </Select>
    </FormControl>
  );
}
