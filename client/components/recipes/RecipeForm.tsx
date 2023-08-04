'use client';

import {
  RecipeFragmentFragment,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '@/queries/generated';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';

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
        initialValues={{ title: recipe ? recipe.title : '' }}
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
                data: {
                  title: values.title,
                },
                id: recipe.id,
              });
              idToNavigateTo = recipe.id;
            } else {
              const { createRecipe: createRecipeResult } = await createRecipe({
                data: values,
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
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
