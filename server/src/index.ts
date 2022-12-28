import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const recipes = [
  {
    id: '1',
    title: 'Canned soup',
    steps: [
      {
        body: 'Open can.',
      },
      {
        body: 'Heat soup.',
      },
      {
        body: 'Serve.',
      },
    ],
  },
  {
    id: '2',
    title: 'Toast',
    steps: [
      {
        body: 'Toast bread.',
      },
      {
        body: 'Spread butter and jam.',
      },
      {
        body: 'Serve.',
      },
    ],
  },
];

const typeDefs = readFileSync('./schema/schema.graphql', { encoding: 'utf-8' });

const resolvers = {
  Query: {
    recipes: () => recipes,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
