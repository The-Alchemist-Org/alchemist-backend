// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Ingredient } from '@entities/ingredient';
import { drinks } from './drinks';

const fetchIngredients = async () => {
  const ingredientsList = drinks.reduce<Set<string>>((acc, recipe) => {
    acc.add(recipe.strIngredient1);
    acc.add(recipe.strIngredient2);
    acc.add(recipe.strIngredient3);
    acc.add(recipe.strIngredient4);
    acc.add(recipe.strIngredient5);
    acc.add(recipe.strIngredient6);
    acc.add(recipe.strIngredient7);
    acc.add(recipe.strIngredient8);
    acc.add(recipe.strIngredient9);
    acc.add(recipe.strIngredient10);
    acc.add(recipe.strIngredient11);
    acc.add(recipe.strIngredient12);
    acc.add(recipe.strIngredient13);
    acc.add(recipe.strIngredient14);
    acc.add(recipe.strIngredient15);
    return acc;
  }, new Set<string>());

  ingredientsList.delete(null);

  const what = [...ingredientsList].map((name) => {
    const ingredient = new Ingredient();
    ingredient.name = name;
    return ingredient;
  });

  return Promise.all(what);
};

export const ingredientSeeder = async (connection: Connection) => {
  const ingredientsList = await fetchIngredients();

  return connection
    .createQueryBuilder()
    .insert()
    .into(Ingredient)
    .values(ingredientsList)
    .execute();
};
