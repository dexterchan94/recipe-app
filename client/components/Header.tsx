import Link from 'next/link';
import s from './Header.module.css';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div>
          <Link href="/">Dexter&apos;s Cookbook</Link>
        </div>
      </div>
    </header>
  );
}
