'use client';

import { useRecipesQuery } from '@/queries/generated';

export default function Recipes() {
  const { data } = useRecipesQuery();

  console.log('HI', data);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
