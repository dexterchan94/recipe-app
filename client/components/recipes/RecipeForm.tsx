'use client';

import {
  RecipeFragmentFragment,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '@/queries/generated';
import { Button, IconButton } from '@mui/material';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  ArrayHelpers,
} from 'formik';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { formValuesToRecipePayload, recipeDataToFormValues } from '@/app/utils';

interface RecipeFormProps {
  recipe?: RecipeFragmentFragment;
}

export default function RecipeForm(props: RecipeFormProps) {
  const { recipe } = props;

  const router = useRouter();
  const { mutateAsync: createRecipe } = useCreateRecipeMutation();
  const { mutateAsync: editRecipe } = useUpdateRecipeMutation();

  return (
    <div>
      <Formik
        initialValues={recipeDataToFormValues(recipe)}
        //  validate={values => {
        //    const errors = {};
        //    if (!values.email) {
        //      errors.email = 'Required';
        //    } else if (
        //      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //    ) {
        //      errors.email = 'Invalid email address';
        //    }
        //    return errors;
        //  }}
        onSubmit={async (values, helpers) => {
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
        }}
      >
        {({ isSubmitting, values }) => {
          console.log(values);
          return (
            <Form>
              <label>
                <div>Title</div>
                <Field type="text" name="title" />
              </label>
              <ErrorMessage name="title" component="div" />
              <h2>Ingredients</h2>
              <FieldArray
                name="ingredients"
                render={(arrayHelpers: ArrayHelpers) => {
                  return (
                    <div>
                      {values.ingredients && values.ingredients.length > 0 && (
                        <ul>
                          {values.ingredients.map((ingredient, index) => {
                            return (
                              <div key={index}>
                                <Field name={`ingredients.${index}.body`} />
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
                              </div>
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
              <br />
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
