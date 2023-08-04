import Link from 'next/link';
import s from './Header.module.css';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <ul className={s.headerLinks}>
          <li className={s.headerLink}>
            <Link href="/">Home</Link>
          </li>
          <li className={s.headerLink}>
            <Link href="/recipes">Recipes</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
