import { IIngredient } from '@entities/ingredient';
import { IRecipe } from '@entities/recipe';

export interface IRecipeToIngredient {
  id: number;
  recipe: IRecipe;
  ingredient: IIngredient;
  quantity: number;
}
