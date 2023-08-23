'use client';

import RecipeForm from '@/components/recipes/RecipeForm';
import { useRecipeByIdQuery } from '@/queries/generated';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BackButton from '@/components/BackButton';

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
      <Box sx={{ mb: 4 }}>
        <BackButton />
      </Box>
      <h1>Edit {data.recipeById.title}</h1>
      <RecipeForm recipe={data.recipeById} />
    </>
  );
}
