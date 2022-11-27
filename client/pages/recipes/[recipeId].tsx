import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const RECIPES = [
  {
    id: '1',
    title: 'Mashed Potatoes',
  },
  {
    id: '2',
    title: 'Roasted Potatoes',
  },
];

async function getRecipe(recipeId: string) {
  const recipe = RECIPES.find((r) => r.id === recipeId);
  return recipe;

  // const res = await fetch("http://localhost:8000/recipes");

  // if (!res.ok) {
  //   throw new Error(res.statusText);
  // }

  // const data = await res.json();
  // return data;
}

function RecipeRoute(props) {
  const { recipe } = props;
  // const router = useRouter();
  // const { recipeId } = router.query;
  // console.log(router.query);

  // console.log("recipe id", recipeId);

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['recipe', recipeId],
  //   queryFn: () => getRecipe(recipeId)
  // })

  // console.log(data);

  // if (isLoading) return 'Loading...'
  // if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <h1>{recipe.title}</h1>
      <div></div>
    </>
  );
}

RecipeRoute.getInitialProps = async (ctx) => {
  console.log(ctx);
  const recipe = RECIPES.find((r) => r.id === '1');
  return {
    recipe,
  };
};

export default RecipeRoute;
