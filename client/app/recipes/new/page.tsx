import Box from '@mui/material/Box';
import BackButton from '@/components/BackButton';
import RecipeForm from '@/components/recipes/RecipeForm';

export default function Page() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <BackButton />
      </Box>
      <h1>New Recipe</h1>
      <RecipeForm />
    </>
  );
}
