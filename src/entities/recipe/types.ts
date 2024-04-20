import { IRecipeToIngredient } from '@entities/recipeToIngredient';

export interface IRecipe {
  id: number;
  name: string;
  uploadedBy: string;
  ingredients: IRecipeToIngredient[]
}
