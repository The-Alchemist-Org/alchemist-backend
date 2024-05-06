import { IRecipeToIngredient } from "@root/entities";

export type RecipesDTO = {
    id: number,
    name: string,
    uploadedBy: string,
    ingredients: IRecipeToIngredient[]
  };
  