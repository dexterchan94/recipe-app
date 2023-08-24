'use client';

import { useDeleteRecipeMutation, useRecipesQuery } from '@/queries/generated';
import Link from 'next/link';
import s from './Recipes.module.css';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: (recipeId: number) => void;
  recipeId: number | null;
}

function ConfirmDeleteRecipeDialog(props: SimpleDialogProps) {
  const { onClose, onDelete, open, recipeId } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!recipeId) {
      onClose();
      return;
    }

    try {
      setIsLoading(true);
      await onDelete(recipeId);
      onClose();
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }, [onClose, onDelete, recipeId]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ mt: 1, mb: 3 }}
      >
        <Button variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleDelete()}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={25} /> : 'Delete'}
        </Button>
      </Stack>
    </Dialog>
  );
}

export default function Recipes() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useRecipesQuery();
  const { mutateAsync: deleteRecipe } = useDeleteRecipeMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState<number | null>(null);

  const handleClickOpen = useCallback((id: number) => {
    setRecipeIdToDelete(id);
    setIsDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setRecipeIdToDelete(null);
    setIsDialogOpen(false);
  }, []);

  const handleDelete = useCallback(
    async (recipeId: number) => {
      try {
        await deleteRecipe({
          id: recipeId,
        });

        queryClient.invalidateQueries(['Recipes']);
      } catch (e) {
        console.error(e);
      }
    },
    [deleteRecipe, queryClient],
  );

  return (
    <div>
      <ConfirmDeleteRecipeDialog
        open={isDialogOpen}
        onClose={handleClose}
        onDelete={handleDelete}
        recipeId={recipeIdToDelete}
      />
      <ul className={s.recipeList}>
        {data?.recipes?.map((recipe) => {
          return (
            <li key={recipe.id} className={s.recipeCard}>
              <div>
                <div className={`h3 ${s.recipeCardTitle}`}>
                  <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                </div>
                <div>By {recipe.author?.name}</div>
              </div>
              <div className={s.recipeCardActions}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  endIcon={<DeleteIcon />}
                  onClick={() => handleClickOpen(recipe.id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
                >
                  Edit
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
