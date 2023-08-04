'use client';

import { useRecipesQuery } from '@/queries/generated';
import Link from 'next/link';
import s from './Recipe.module.css';

export default function Recipes() {
  const { data } = useRecipesQuery();

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
                <Link href={`/recipes/${recipe.id}`}>View</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
