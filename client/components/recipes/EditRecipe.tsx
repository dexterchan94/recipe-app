'use client';

import RecipeForm from '@/components/recipes/RecipeForm';
import { useRecipeByIdQuery } from '@/queries/generated';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import s from './Recipe.module.css';

interface EditRecipeProps {
  recipeId: string;
}

export default function EditRecipe(props: EditRecipeProps) {
  const { recipeId } = props;

  const router = useRouter();
  const { data } = useRecipeByIdQuery({
    id: Number.parseInt(recipeId),
  });

  if (!data || !data.recipeById) {
    return null;
  }

  return (
    <>
      <div className={s.pageHeaderActions}>
        <Button
          variant="text"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <h1>Edit {data.recipeById.title}</h1>
      <RecipeForm recipe={data.recipeById} />
    </>
  );
}
