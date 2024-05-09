import { IRecipeToIngredient } from '@root/entities';
import { RecipesDTO } from './types';

export const toRecipesDTO = async (
  recipeId: number,
  recipeName: string,
  recipeUploadedBy: number,
  recipeIngredients: IRecipeToIngredient[],
): Promise<RecipesDTO> => ({
  id: recipeId,
  name: recipeName,
  uploadedBy: recipeUploadedBy,
  ingredients: recipeIngredients,
});
