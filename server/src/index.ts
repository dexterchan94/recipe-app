import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

const RECIPES = [
  {
    id: 1,
    title: 'Mashed Potatoes',
  },
  {
    id: 2,
    title: 'Roasted Potatoes',
  },
];

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/recipes', (req: Request, res: Response) => {
  res.json(RECIPES);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});