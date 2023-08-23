'use client';

import { useDeleteRecipeMutation, useRecipesQuery } from '@/queries/generated';
import Link from 'next/link';
import s from './Recipes.module.css';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function Recipes() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useRecipesQuery();
  const { mutateAsync: deleteRecipe } = useDeleteRecipeMutation();

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
                  onClick={() => handleDelete(recipe.id)}
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
