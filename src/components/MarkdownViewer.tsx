'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <Box
      sx={{
        backgroundColor: '#1d1a1a',
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
          boxShadow: '0 0 6px #00000099',
        },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}
