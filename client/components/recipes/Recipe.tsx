'use client';

import { useRecipeByIdQuery } from '@/queries/generated';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import s from './Recipe.module.css';
import { ChangeEvent, useCallback, useState } from 'react';
import BackButton from '../BackButton';

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <BackButton />
        <Button
          variant="text"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/recipes/${id}/edit`)}
        >
          Edit
        </Button>
      </Stack>
      <div className={s.recipeSection}>
        <h1>{data.recipeById.title}</h1>
        <p>By {data.recipeById.author?.name}</p>
      </div>
      <div className={s.recipeSection}>
        <h2>Ingredients</h2>
        <ul>
          {data.recipeById.ingredients?.map((ingredient) => {
            return (
              <CheckableListItem key={ingredient.id} text={ingredient.body} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

interface CheckableListItemProps {
  text: string;
}

function CheckableListItem(props: CheckableListItemProps) {
  const { text } = props;

  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  return (
    <li>
      <label className={s.checkableListItem}>
        <Checkbox checked={checked} onChange={handleChange} />
        <span className={`${checked ? s.checkableListItemLabelChecked : ''}`}>
          {text}
        </span>
      </label>
    </li>
  );
}
