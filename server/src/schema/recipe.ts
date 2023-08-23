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
import { CreateRecipeIngredientInput } from './recipeIngredient';

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.int('authorId');
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user.findUnique({
          where: { id: parent.authorId },
        });
      },
    });
    t.list.nonNull.field('ingredients', {
      type: 'RecipeIngredient',
      resolve: (parent, _, context: Context) => {
        return context.prisma.recipeIngredient.findMany({
          where: { recipeId: parent.id },
          orderBy: [
            {
              order: 'asc',
            },
          ],
        });
      },
    });
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
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context: Context) => {
    return context.prisma.recipe.findUnique({
      where: { id: args.id || undefined },
    });
  },
});

export const recipesByUserIdQuery = queryField('recipesByUserId', {
  type: list(nonNull('Recipe')),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context: Context) => {
    return context.prisma.recipe.findMany({
      where: { authorId: args.id },
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
        ingredients: {
          create: args.data.ingredients ?? [],
        },
      },
    });
  },
});

export const CreateRecipeInput = inputObjectType({
  name: 'CreateRecipeInput',
  definition(t) {
    t.nonNull.string('title');
    t.list.nonNull.field('ingredients', {
      type: CreateRecipeIngredientInput,
    });
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
  resolve: async (_, args, context: Context) => {
    // Use Prisma Transaction to roll back if any operation fails
    const [, updatedRecipe] = await context.prisma.$transaction([
      // Delete all ingredients
      context.prisma.recipeIngredient.deleteMany({
        where: {
          recipeId: args.id,
        },
      }),
      // Update recipe data and create new list of ingredients
      context.prisma.recipe.update({
        where: { id: args.id },
        data: {
          title: args.data.title,
          ingredients: {
            createMany: {
              data: args.data.ingredients ?? [],
            },
          },
        },
      }),
    ]);

    return updatedRecipe;
  },
});

export const UpdateRecipeInput = inputObjectType({
  name: 'UpdateRecipeInput',
  definition(t) {
    t.nonNull.string('title');
    t.list.nonNull.field('ingredients', {
      type: CreateRecipeIngredientInput,
    });
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
