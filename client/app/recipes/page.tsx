import HydratedRecipes from '@/components/recipes/HydratedRecipes';

export default async function RecipesRoute() {
  return (
    <div>
      <h1>All Recipes</h1>
      <HydratedRecipes />
    </div>
  );
}
