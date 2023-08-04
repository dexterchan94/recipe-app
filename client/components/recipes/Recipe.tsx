'use client';

import { useRecipeByIdQuery } from '@/queries/generated';

export interface RecipeProps {
  id: string;
}

export default function Recipe(props: RecipeProps) {
  const { id } = props;

  const { data } = useRecipeByIdQuery({
    id: Number.parseInt(id),
  });

  return (
    <div>
      <h1>{data?.recipeById?.title}</h1>
      <p>By {data?.recipeById?.author?.name}</p>
    </div>
  );
}
