import { IRecipeToIngredient } from '@root/entities';
import { RecipesDTO } from './types';

export const toRecipesDTO = async (
  recipeId: number,
  recipeName: string,
  recipeUploadedBy: string,
  recipeIngredients: IRecipeToIngredient[],
): Promise<RecipesDTO> => ({
  id: recipeId,
  name: recipeName,
  uploadedBy: recipeUploadedBy,
  ingredients: recipeIngredients,
});
