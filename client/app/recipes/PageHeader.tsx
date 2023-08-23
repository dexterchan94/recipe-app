'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';

export default function PageHeader() {
  const router = useRouter();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ mb: 4 }}
    >
      <h1>All Recipes</h1>
      <Button
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        onClick={() => router.push(`/recipes/new`)}
      >
        New Recipe
      </Button>
    </Stack>
  );
}
