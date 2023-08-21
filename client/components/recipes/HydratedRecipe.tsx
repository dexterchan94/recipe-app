import getQueryClient from '@/app/getQueryClient';
import { fetcher } from '@/queries/fetcher';
import { RecipeByIdDocument } from '@/queries/generated';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import Recipe, { RecipeProps } from './Recipe';

export default async function HydratedRecipe(props: RecipeProps) {
  const { id } = props;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    ['RecipeById', { id: Number.parseInt(id) }],
    fetcher(RecipeByIdDocument, { id: Number.parseInt(id) }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Recipe id={id} />
    </Hydrate>
  );
}
