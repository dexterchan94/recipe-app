'use client';

import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <Button
        variant="text"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => router.back()}
      >
        Back
      </Button>
    </>
  );
}
