'use client';

import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useNoteStore } from '@/lib/useNoteStore';
import AddNoteModal from '@/components/AddNoteModal';

export default function VaultPage() {
  const { notes } = useNoteStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3,mt:10 }}
        onClick={() => setOpen(true)}
      >
        + Add Note
      </Button>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid size={{xs:12,md:4}} key={note.slug}>
            <Link href={`/vault/${note.slug}`} passHref>
              <div
                style={{
                  backgroundColor: '#221f1f',
                  padding: '16px',
                  borderRadius: '8px',
                  minHeight: '120px',
                  boxShadow: '0 0 4px #00000080',
                }}
              >
                <h3 style={{ fontFamily: 'Cinzel', color: '#b92e34' }}>{note.title}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  {note.tags?.join(', ') || 'untagged'}
                </p>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>

      <AddNoteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
