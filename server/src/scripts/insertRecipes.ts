import Recipe from '../models/recipe';

export default async function insertRecipes() {
  const cannedSoupRecipe = new Recipe({
    title: 'Canned soup',
    steps: [
      {
        body: 'Heat.',
      },
      {
        body: 'Serve.',
      },
    ],
  });
  await cannedSoupRecipe.save();

  const iceWaterRecipe = new Recipe({
    title: 'Ice water',
    steps: [
      {
        body: 'Pour water.',
      },
      {
        body: 'Add ice.',
      },
    ],
  });
  await iceWaterRecipe.save();
}
