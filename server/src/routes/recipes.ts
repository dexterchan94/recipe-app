import express, { Request, Response } from 'express';
import Recipe from '../models/recipe';

const router = express.Router({ mergeParams: true });

async function handleGetRecipes(req: Request, res: Response) {
  const recipes = await Recipe.find();
  res.json(recipes);
}

router.get('/', handleGetRecipes);

export default router;
