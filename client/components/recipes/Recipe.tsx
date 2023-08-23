'use client';

import { useRecipeByIdQuery } from '@/queries/generated';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import s from './Recipe.module.css';

export interface RecipeProps {
  id: string;
}

export default function Recipe(props: RecipeProps) {
  const { id } = props;

  const router = useRouter();
  const { data } = useRecipeByIdQuery({
    id: Number.parseInt(id),
  });

  if (!data || !data.recipeById) {
    return null;
  }

  return (
    <div>
      <div className={s.pageHeaderActions}>
        <Button
          variant="text"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          variant="text"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/recipes/${id}/edit`)}
        >
          Edit
        </Button>
      </div>
      <h1>{data.recipeById.title}</h1>
      <p>By {data.recipeById.author?.name}</p>
      <h2>Ingredients</h2>
      <ul>
        {data.recipeById.ingredients?.map((ingredient) => {
          return <li key={ingredient.id}>{ingredient.body}</li>;
        })}
      </ul>
    </div>
  );
}
