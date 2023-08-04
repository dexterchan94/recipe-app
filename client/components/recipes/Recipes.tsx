'use client';

import { useDeleteRecipeMutation, useRecipesQuery } from '@/queries/generated';
import Link from 'next/link';
import s from './Recipe.module.css';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function Recipes() {
  const [recipeIdDeleting, setRecipeIdDeleting] = useState<number | null>(null);

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
                <Link href={`/recipes/${recipe.id}/edit`}>Edit</Link>
              </div>
              <button
                onClick={() => handleDelete(recipe.id)}
                disabled={recipeIdDeleting === recipe.id}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
