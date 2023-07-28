import { intArg, makeSchema, objectType } from 'nexus';
import { Context } from './context';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });

    t.nullable.field('userById', {
      type: 'User',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user.findUnique({
          where: { id: args.id || undefined },
        });
      },
    });

    t.list.nonNull.field('allRecipes', {
      type: 'Recipe',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.recipe.findMany();
      },
    });

    t.nullable.field('recipeById', {
      type: 'Recipe',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.recipe.findUnique({
          where: { id: args.id || undefined },
        });
      },
    });
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.nonNull.string('email');
    t.list.nonNull.field('recipes', {
      type: 'Recipe',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .recipes();
      },
    });
  },
});

const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.int('authorId');
  },
});

export const schema = makeSchema({
  types: [Query, Recipe, User],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
