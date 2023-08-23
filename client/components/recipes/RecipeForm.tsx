'use client';

import {
  RecipeFragmentFragment,
  RecipeIngredientFragment,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '@/queries/generated';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  FieldArray,
  ArrayHelpers,
  FormikHelpers,
  useFormik,
  FormikProvider,
  FormikErrors,
  useFormikContext,
} from 'formik';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  RecipeFormValue,
  formValuesToRecipePayload,
  recipeDataToFormValues,
} from '@/app/utils';
import * as Yup from 'yup';
import { useCallback } from 'react';
import s from './RecipeForm.module.css';

interface RecipeFormProps {
  recipe?: RecipeFragmentFragment;
}

const RecipeFormSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  ingredients: Yup.array().of(
    Yup.object().shape({
      body: Yup.string().required('Required'),
    }),
  ),
});

export default function RecipeForm(props: RecipeFormProps) {
  const { recipe } = props;

  const router = useRouter();
  const { mutateAsync: createRecipe } = useCreateRecipeMutation();
  const { mutateAsync: editRecipe } = useUpdateRecipeMutation();

  const handleSubmit = useCallback(
    async (
      values: RecipeFormValue,
      helpers: FormikHelpers<RecipeFormValue>,
    ) => {
      console.log(JSON.stringify(values, null, 2));
      try {
        let idToNavigateTo;
        if (recipe) {
          await editRecipe({
            data: formValuesToRecipePayload(values),
            id: recipe.id,
          });
          idToNavigateTo = recipe.id;
        } else {
          const { createRecipe: createRecipeResult } = await createRecipe({
            data: formValuesToRecipePayload(values),
            authorId: 1, // TODO remove hardcode
          });
          idToNavigateTo = createRecipeResult?.id;
        }

        helpers.setSubmitting(false);

        if (idToNavigateTo) {
          router.push(`/recipes/${idToNavigateTo}`);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [createRecipe, editRecipe, recipe, router],
  );

  const formik = useFormik({
    initialValues: recipeDataToFormValues(recipe),
    validationSchema: RecipeFormSchema,
    onSubmit: handleSubmit,
  });

  console.log(formik);

  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.recipeFormSection}>
            <TextField
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </div>
          <RecipeFormIngredients />
          <div className={s.recipeFormSection}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}

function RecipeFormIngredients() {
  const formik = useFormikContext<RecipeFormValue>();

  return (
    <div className={s.recipeFormSection}>
      <h2>Ingredients</h2>
      <FieldArray
        name="ingredients"
        render={(arrayHelpers: ArrayHelpers) => {
          return (
            <div>
              {formik.values.ingredients &&
                formik.values.ingredients.length > 0 && (
                  <ul>
                    {formik.values.ingredients.map((ingredient, index) => {
                      return (
                        <li className={s.ingredientRow} key={index}>
                          <TextField
                            className={s.ingredientRowTextField}
                            name={`ingredients.${index}.body`}
                            label={`Ingredient ${index + 1}`}
                            value={formik.values.ingredients[index].body}
                            size="small"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.ingredients?.[index]?.body &&
                              Boolean(
                                (
                                  formik.errors.ingredients?.[
                                    index
                                  ] as FormikErrors<RecipeIngredientFragment>
                                )?.body,
                              )
                            }
                            helperText={
                              formik.touched.ingredients?.[index]?.body &&
                              (
                                formik.errors.ingredients?.[
                                  index
                                ] as FormikErrors<RecipeIngredientFragment>
                              )?.body
                            }
                          />
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="insert"
                            color="primary"
                            onClick={() =>
                              arrayHelpers.insert(index, { body: '' })
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </li>
                      );
                    })}
                  </ul>
                )}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => arrayHelpers.push({ body: '' })}
              >
                Add Ingredient
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
