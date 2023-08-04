'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import s from './page.module.css';
import { ReactNode } from 'react';

interface RecipesLayoutProps {
  children: ReactNode;
}

export default function Layout(props: RecipesLayoutProps) {
  const { children } = props;

  const layoutSegment = useSelectedLayoutSegment();

  return (
    <div className={s.recipesLayout}>
      <ul className={s.recipesLayoutLinks}>
        <li
          className={`${s.recipesLayoutLink} ${
            layoutSegment ? '' : s.recipesLayoutLinkActive
          }`}
        >
          <Link href="/recipes">All Recipes</Link>
        </li>
        <li
          className={`${s.recipesLayoutLink} ${
            layoutSegment === 'new' ? s.recipesLayoutLinkActive : ''
          }`}
        >
          <Link href="/recipes/new">New Recipe</Link>
        </li>
      </ul>
      <div className={s.recipesLayoutBody}>{children}</div>
    </div>
  );
}
