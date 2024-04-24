// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Ingredient } from '@entities/ingredient';
import { Recipe, RecipeToIngredient, User } from '@root/entities';


export const recipeSeeder = async (connection: Connection) => {
  const ingredientRepo = connection.getRepository(Ingredient);
  const userRepo = connection.getRepository(User);
  const recipeRepo = connection.getRepository(Recipe);
  const recipeToIngredientRepo = connection.getRepository(RecipeToIngredient);

  const recipesList: Recipe[] = [];
  const rectoingrList: RecipeToIngredient[] = [];

  const rec: Recipe = new Recipe();
  const ingr = await ingredientRepo.findOne({ where: { name: 'gin' } });
  const user = await userRepo.findOne({ where: { id: 1 } });

  console.log(user);
  console.log(ingr);

  const recti: RecipeToIngredient = new RecipeToIngredient();
  rec.name = 'test';
  recti.recipe = rec;
  recti.ingredient = ingr;
  recti.quantity = 1;

  await recipeRepo.save(rec);
  await recipeToIngredientRepo.save(recti);

  return true;
};
