'use client';
import { useTestQueryQuery } from '../queries/generated';

export default function Recipes() {
  const { data } = useTestQueryQuery();

  console.log('HI', data);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
