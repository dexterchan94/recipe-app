import {
  CreateRecipeInput,
  RecipeFragmentFragment,
  RecipeIngredientFragment,
  UpdateRecipeInput,
} from '@/queries/generated';

export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export interface RecipeFormValue {
  id?: number;
  title: string;
  ingredients: RecipeIngredientFragment[];
}

export function recipeDataToFormValues(
  recipe: RecipeFragmentFragment | undefined,
): RecipeFormValue {
  if (!recipe) {
    return {
      title: '',
      ingredients: [],
    };
  }

  return {
    id: recipe.id,
    title: recipe.title ?? '',
    ingredients: recipe.ingredients ?? [],
  };
}

export function formValuesToRecipePayload(
  values: RecipeFormValue,
): CreateRecipeInput | UpdateRecipeInput {
  return {
    title: values.title,
    ingredients: values.ingredients.map((ingredient, index) => {
      return {
        order: index,
        body: ingredient.body,
      };
    }),
  };
}
