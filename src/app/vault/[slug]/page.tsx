'use client';

import { mockFiles } from '@/lib/files';
import { notFound } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NotePage({ params }: { params: { slug: string } }) {
  const file = mockFiles.find((f) => f.slug === params.slug);

  if (!file) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        {file.title}
      </Typography>
      <Box sx={{ mt: 2, backgroundColor: '#1a1a1a', p: 3, borderRadius: 2 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{file.content}</ReactMarkdown>
      </Box>
    </Container>
  );
}
