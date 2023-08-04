import EditRecipe from './edit';

export default function Page({ params }: { params: { recipeId: string } }) {
  return <EditRecipe recipeId={params.recipeId} />;
}
