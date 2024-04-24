// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Ingredient } from '@entities/ingredient';
import { Recipe, RecipeToIngredient } from '@root/entities';


export const recipeSeeder = async (connection: Connection) => {
  const ingredientRepo = connection.getRepository(Ingredient);

  const recipesList: Recipe[] = [];
  const rectoingrList: RecipeToIngredient[] = [];

  const rec: Recipe = new Recipe();
  const ingr = await ingredientRepo.findOneBy({ name: 'gin' });

  const recti: RecipeToIngredient = new RecipeToIngredient();
  rec.name = 'test';
  recti.recipe = rec;
  recti.ingredient = ingr;
  recipesList.push(rec);
  rectoingrList.push(recti);

  return connection
    .createQueryBuilder()
    .insert()
    .into(Recipe)
    .values(recipesList)
    .insert()
    .into(RecipeToIngredient)
    .values(rectoingrList)
    .execute();
};
