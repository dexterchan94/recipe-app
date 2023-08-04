import EditRecipe from '../../../../components/recipes/EditRecipe';

export default function Page({ params }: { params: { recipeId: string } }) {
  return <EditRecipe recipeId={params.recipeId} />;
}
