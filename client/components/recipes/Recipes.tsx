'use client';

import { useDeleteRecipeMutation, useRecipesQuery } from '@/queries/generated';
import Link from 'next/link';
import s from './Recipes.module.css';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function Recipes() {
  const [recipeIdDeleting, setRecipeIdDeleting] = useState<number | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useRecipesQuery();
  const { mutateAsync: deleteRecipe } = useDeleteRecipeMutation();

  const handleDelete = useCallback(
    async (recipeId: number) => {
      try {
        setRecipeIdDeleting(recipeId);

        await deleteRecipe({
          id: recipeId,
        });

        queryClient.invalidateQueries(['Recipes']);
        setRecipeIdDeleting(null);
      } catch (e) {
        console.error(e);
      }
    },
    [deleteRecipe, queryClient],
  );

  return (
    <div>
      <ul>
        {data?.recipes?.map((recipe) => {
          return (
            <li key={recipe.id} className={s.recipeCard}>
              <div>
                <div>
                  <Link href={`/recipes/${recipe.id}`}>
                    <strong>{recipe.title}</strong>
                  </Link>
                </div>
                <div>By {recipe.author?.name}</div>
              </div>
              <div>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(recipe.id)}
                  disabled={recipeIdDeleting === recipe.id}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
