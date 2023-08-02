import HydratedRecipes from '../components/recipes/HydratedRecipes';
import styles from './page.module.css';

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      <HydratedRecipes />
    </main>
  );
}
