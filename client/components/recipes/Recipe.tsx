'use client';

import { useRecipeByIdQuery } from '@/queries/generated';
import Link from 'next/link';

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
      <div>
        <Link href={`/recipes/${id}/edit`}>Edit</Link>
      </div>
      <h1>{data?.recipeById?.title}</h1>
      <p>By {data?.recipeById?.author?.name}</p>
    </div>
  );
}
