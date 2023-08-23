import HydratedRecipes from '@/components/recipes/HydratedRecipes';
import PageHeader from './PageHeader';

export default async function RecipesRoute() {
  return (
    <div>
      <PageHeader />
      <HydratedRecipes />
    </div>
  );
}
