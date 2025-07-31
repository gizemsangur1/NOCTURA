import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '240px' }}>
        <Topbar />
        <Box
          component="main"
          sx={{
            pt: '64px', 
            minHeight: '100vh',
            p: 4,
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
