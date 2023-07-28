import HydratedRecipes from './hydratedRecipes';
import styles from './page.module.css';

export default async function Home(props: any) {
  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      <HydratedRecipes />
    </main>
  );
}
