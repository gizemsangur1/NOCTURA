'use client';

import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Topbar() {
  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <AppBar
      position="fixed"
      sx={{
        left: 240, 
        width: `calc(100% - 240px)`,
        boxShadow: 'none',
        bgcolor: 'background.paper',
        borderBottom: '1px solid #2b2b2b',
        zIndex: 1000,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: '64px',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: 'Cinzel', color: 'primary.main', letterSpacing: 1 }}
        >
          {date}
        </Typography>

        <Box>
          <IconButton color="inherit">
            <DarkModeIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
