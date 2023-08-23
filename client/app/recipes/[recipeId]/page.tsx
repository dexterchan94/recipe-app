import HydratedRecipe from '@/components/recipes/HydratedRecipe';

export default function Page({ params }: { params: { recipeId: string } }) {
  return <HydratedRecipe id={params.recipeId} />;
}
