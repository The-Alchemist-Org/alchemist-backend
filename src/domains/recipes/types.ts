import { IRecipeToIngredient } from '@root/entities';

export type RecipesDTO = {
  id: number,
  name: string,
  uploadedBy: number,
  ingredients: IRecipeToIngredient[]
};

export type RecipeServiceResult = {
  results: RecipesDTO[],
  page: number,
  pageSize: number,
  totalPages: number
};
