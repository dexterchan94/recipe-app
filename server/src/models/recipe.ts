import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  body: String,
});

const recipeSchema = new mongoose.Schema({
  title: String,
  steps: [stepSchema],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
