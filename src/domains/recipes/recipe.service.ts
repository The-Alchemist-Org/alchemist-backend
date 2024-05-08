import StatusError from '@root/utils/statusError';
import { IRecipeRepository, RecipeRepository } from '@root/repositories/recipe.repository';
import { IRecipeToIngredient, Recipe } from '@root/entities';
import { IRecipeToIngredientRepository, RecipeToIngredientRepository } from '@root/repositories/recipe_to_ingredient.repository';
import { Request } from 'express';
import { toRecipesDTO } from './recipes.dto';
import { RecipesDTO } from './types';

export interface RecipeServiceResult {
  results: RecipesDTO[],
  page: number,
  pageSize: number,
  totalPages: number
}

export interface IRecipeService {
  search(req: Request): Promise<RecipeServiceResult>;
}
export class RecipeService implements IRecipeService {
  constructor(
    private recipeRepository: IRecipeRepository = new RecipeRepository(),
    private recipeToIngredientRepository: IRecipeToIngredientRepository
    = new RecipeToIngredientRepository(),
  ) { }

  async search(req: Request): Promise<RecipeServiceResult> {
    const recipes = await this.recipeRepository.getRecipeBySearch(req);

    if (recipes == null) {
      throw new StatusError(404, 'Nothing in recipes');
    }

    const recipeDTOs: RecipesDTO[] = await Promise.all(recipes.results
      .map(async (recipe: Recipe) => {
        const ingredients: IRecipeToIngredient[] = await this.recipeToIngredientRepository
          .getIngredientsById(recipe.id);
        return toRecipesDTO(recipe.id, recipe.name, recipe.uploadedBy, ingredients);
      }));

    const result: RecipeServiceResult = {
      results: recipeDTOs,
      page: parseInt(req.query.page?.toString(), 10),
      pageSize: parseInt(req.query.limit?.toString(), 10),
      totalPages: recipes.totalPages,
    };

    return result;
  }
}
