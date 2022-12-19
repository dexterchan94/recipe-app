import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import recipesRouter from './routes/recipes';
// import insertRecipes from './scripts/insertRecipes';

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

  // Repopulate DB
  // await insertRecipes();
}

const app = express();
const port = 8000;

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/recipes', recipesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
