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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
