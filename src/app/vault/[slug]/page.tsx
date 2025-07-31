'use client';

import { notFound } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNoteStore } from '@/lib/useNoteStore';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const { notes } = useNoteStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const file = notes.find((f) => f.slug === params.slug);
  if (!file) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        {file.title}
      </Typography>
      <Box
        sx={{
          mt: 2,
          backgroundColor: '#1a1a1a',
          p: 3,
          borderRadius: 2,
          border: '1px solid #2b2b2b',
          fontFamily: `'EB Garamond', serif`,
          fontSize: '1.1rem',
          color: '#e0e0e0',
          lineHeight: 1.7,
          '& img': {
            maxWidth: '100%',
            borderRadius: '4px',
            marginTop: '1rem',
            marginBottom: '1rem',
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {file.content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}
