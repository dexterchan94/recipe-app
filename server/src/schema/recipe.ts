import {
  arg,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  mutationField,
  queryField,
  list,
} from 'nexus';
import { Context } from '../context';

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.int('authorId');
  },
});

export const recipesQuery = queryField('recipes', {
  type: list(nonNull('Recipe')),
  resolve: (_parent, _args, context: Context) => {
    return context.prisma.recipe.findMany();
  },
});

export const recipeByIdQuery = queryField('recipeById', {
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

export const createRecipe = mutationField('createRecipe', {
  type: 'Recipe',
  args: {
    data: nonNull(
      arg({
        type: 'CreateRecipeInput',
      }),
    ),
    authorId: nonNull(intArg()),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.recipe.create({
      data: {
        title: args.data.title,
        author: {
          connect: { id: args.authorId },
        },
      },
    });
  },
});

export const CreateRecipeInput = inputObjectType({
  name: 'CreateRecipeInput',
  definition(t) {
    t.nonNull.string('title');
  },
});

export const updateRecipe = mutationField('updateRecipe', {
  type: 'Recipe',
  args: {
    data: nonNull(
      arg({
        type: 'UpdateRecipeInput',
      }),
    ),
    id: nonNull(intArg()),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.recipe.update({
      where: { id: args.id || undefined },
      data: {
        title: args.data.title,
      },
    });
  },
});

export const UpdateRecipeInput = inputObjectType({
  name: 'UpdateRecipeInput',
  definition(t) {
    t.nonNull.string('title');
  },
});

export const deleteRecipe = mutationField('deleteRecipe', {
  type: 'Recipe',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.recipe.delete({
      where: { id: args.id },
    });
  },
});
