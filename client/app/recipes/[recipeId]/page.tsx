import HydratedRecipe from '@/components/recipes/HydratedRecipe';

export default function Page({ params }: { params: { recipeId: string } }) {
  console.log(params);

  return <HydratedRecipe id={params.recipeId} />;
}
