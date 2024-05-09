import { IRecipeToIngredient } from '@root/entities';

export type RecipeBody = {
  name: string;
  uploadedBy: number;
  ingredients: IRecipeToIngredient[];
};
