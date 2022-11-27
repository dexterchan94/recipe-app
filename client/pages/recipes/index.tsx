import { useQuery } from 'react-query';

async function getRecipes() {
  const res = await fetch('http://localhost:8000/recipes');

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data;
}

export default function RecipesRoute() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <h1>Recipes</h1>
      <ul>
        {data.map((recipe) => {
          return <li key={recipe.id}>{recipe.title}</li>;
        })}
      </ul>
    </>
  );
}
