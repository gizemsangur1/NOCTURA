'use client';

import { Box } from '@mui/material';
import Sidebar from './Sidebar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          ml: '240px', // Sidebar genişliği kadar margin
          width: '100%',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
