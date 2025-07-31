'use client';

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Vault', href: '/vault', icon: <ArticleIcon /> },
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: '#1a1515',
        borderRight: '1px solid #2b2b2b',
        position: 'fixed',
        top: 0,
        left: 0,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          fontFamily: 'Cinzel',
          fontSize: '1.4rem',
          color: '#b92e34',
          mb: 4,
        }}
      >
        NOCTURA
      </Box>

      <List disablePadding>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <ListItemButton
              selected={pathname.startsWith(item.href)}
              sx={{
                color: '#e0e0e0',
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: '#2a1a1a',
                  color: '#b92e34',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
}
