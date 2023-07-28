import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from './getQueryClient';
import Recipes from './recipes';
import { TestQueryDocument } from '../queries/generated';
import { fetcher } from '../queries/fetcher';

export default async function HydratedRecipes() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['testQuery'], fetcher(TestQueryDocument));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Recipes />
    </Hydrate>
  );
}
