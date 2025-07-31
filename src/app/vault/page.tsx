'use client';

import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { mockFiles } from '@/lib/files';

export default function VaultPage() {
  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      {mockFiles.map((file) => (
        <Grid size={{ xs: 12, md: 4 }} key={file.slug}>
          <Link href={`/vault/${file.slug}`} passHref>
            <Card sx={{ height: '100%', backgroundColor: '#111' }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {file.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {file.tags?.join(', ')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
