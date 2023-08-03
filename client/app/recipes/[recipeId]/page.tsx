import HydratedRecipe from '@/components/recipes/HydratedRecipe';

export default function Page({ params }: { params: { recipeId: string } }) {
  console.log(params);

  return (
    <div>
      <h1>Recipe Route!!!</h1>
      <HydratedRecipe id={params.recipeId} />
    </div>
  );
}
