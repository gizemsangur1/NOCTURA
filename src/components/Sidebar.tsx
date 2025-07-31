'use client';

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

const navItems = [
  { label: 'Vault', href: '/vault', icon: <ArticleIcon /> },
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
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
          color: theme.palette.primary.main,
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
                color: theme.palette.text.primary,
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
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
