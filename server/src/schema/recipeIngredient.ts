import { inputObjectType, objectType } from 'nexus';
import { Context } from '../context';

export const RecipeIngredient = objectType({
  name: 'RecipeIngredient',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('order');
    t.nonNull.string('body');
    t.nonNull.int('recipeId');
    t.field('recipe', {
      type: 'Recipe',
      resolve: (parent, _, context: Context) => {
        return context.prisma.recipe.findUnique({
          where: { id: parent.recipeId },
        });
      },
    });
  },
});

export const CreateRecipeIngredientInput = inputObjectType({
  name: 'CreateRecipeIngredientInput',
  definition(t) {
    t.nonNull.int('order');
    t.nonNull.string('body');
  },
});

export const UpdateRecipeIngredientInput = inputObjectType({
  name: 'UpdateRecipeIngredientInput',
  definition(t) {
    t.int('id');
    t.nonNull.int('order');
    t.nonNull.string('body');
  },
});
