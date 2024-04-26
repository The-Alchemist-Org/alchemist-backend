// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Ingredient } from '@entities/ingredient';
import { Recipe, RecipeToIngredient } from '@root/entities';
import { drinks } from './drinks';

const fetchRecipes = async () => {
  const recipesList = drinks.reduce<Set<Recipe>>((acc, recipe) => {
    const rec = new Recipe();

    rec.name = recipe.strDrink;
    rec.ingredients = [];
    const ingredientsList = new Set<string>();

    ingredientsList.add(recipe.strIngredient1);
    ingredientsList.add(recipe.strIngredient2);
    ingredientsList.add(recipe.strIngredient3);
    ingredientsList.add(recipe.strIngredient4);
    ingredientsList.add(recipe.strIngredient5);
    ingredientsList.add(recipe.strIngredient6);
    ingredientsList.add(recipe.strIngredient7);
    ingredientsList.add(recipe.strIngredient8);
    ingredientsList.add(recipe.strIngredient9);
    ingredientsList.add(recipe.strIngredient10);
    ingredientsList.add(recipe.strIngredient11);
    ingredientsList.add(recipe.strIngredient12);
    ingredientsList.add(recipe.strIngredient13);
    ingredientsList.add(recipe.strIngredient14);
    ingredientsList.add(recipe.strIngredient15);

    ingredientsList.delete(null);

    const what = [...ingredientsList].map((name) => {
      const ingredient = new Ingredient();
      ingredient.name = name;
      return ingredient;
    });

    what.map((ingredient) => {
      const recti = new RecipeToIngredient();
      recti.ingredient = ingredient;
      recti.quantity = 1;

      const parsedString = parseMeasurments(recipe.strMeasure1);
      console.log(parsedString);

      rec.ingredients.push(recti);
    });

    acc.add(rec);
    return acc;
  }, new Set<Recipe>());

  return Promise.all(recipesList);
}

function parseMeasurments(inputString: string) {
  const measurements: { [key: string]: number } = {
    oz: 3,
    'juice of': 4.5,
    tsp: 0.5,
    cl: 1,
    ml: 0.1,
    shot: 4,
    shots: 4,
    jigger: 2,
    dl: 0.1,
  };

  const regex = /((\d+(\.\d+)?)|(\d+\/\d+)|(\d+\s+\d+\/\d+))\s*(oz|juice of|tsp|ml|cl|shot|jigger|dl|shots)/g;

  let result = inputString;
  let match;

  while ((match = regex.exec(inputString)) !== null) {
    let value;
    if (match[3] !== undefined) {
      // If a decimal number
      value = parseFloat(match[3]);
  } else if (match[4] !== undefined) {
      // If a fraction
      const [numerator, denominator] = match[4].split('/');
      value = parseInt(numerator, 10) / parseInt(denominator, 10);
  } else if (match[5] !== undefined) {
      // If a mixed number
      const [wholePart, fractionPart] = match[5].split(' ');
      const [numerator, denominator] = fractionPart.split('/');
      value = parseInt(wholePart, 10) + parseInt(numerator, 10) / parseInt(denominator, 10);
  } else {
      // If a whole number
      value = parseFloat(match[1]);
  }

  if (!isNaN(value)) { // Check if value is a valid number
      const unit = match[6];
      if (measurements.hasOwnProperty(unit)) {
        // Convert the measurement to cl
        const clValue = value * measurements[unit];
        // Replace the original measurement in the string with the equivalent value in cl
        result = result.replace(match[0], `${clValue.toFixed(2)} cl`);
      }
    }
  }

  return result;
}

export const recipeSeeder = async (connection: Connection) => {
  const ingredientRepo = connection.getRepository(Ingredient);
  const recipeRepo = connection.getRepository(Recipe);
  const recipeToIngredientRepo = connection.getRepository(RecipeToIngredient);

  const recipesList = await fetchRecipes();

  for (const recipe of recipesList) {
    await recipeRepo.save(recipe);
    for (const recipeToIngredient of recipe.ingredients) {
      const recti = new RecipeToIngredient();
      const ingr = await ingredientRepo.findOne({ where: { name: recipeToIngredient.ingredient.name } });

      recti.recipe = recipe;
      recti.ingredient = ingr;
      recti.quantity = 1;

      await recipeToIngredientRepo.save(recti);
    }
  }

  return true;
};
