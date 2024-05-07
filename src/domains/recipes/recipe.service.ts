import StatusError from '@root/utils/statusError';
import { RecipesDTO } from './types';
import { toRecipesDTO } from './recipes.dto';
import { IRecipeRepository, RecipeRepository } from '@root/repositories/recipe.repository';
import { IRecipeToIngredient, Recipe, RecipeToIngredient } from '@root/entities';
import { IRecipeToIngredientRepository, RecipeToIngredientRepository } from '@root/repositories/recipe_to_ingredient.repository';

export interface IRecipeService {
  search(query: string): Promise<RecipesDTO[]>;
}
export class RecipeService implements IRecipeService {
  constructor(
    private recipeRepository: IRecipeRepository = new RecipeRepository(),
    private recipeToIngredientRepository: IRecipeToIngredientRepository = new RecipeToIngredientRepository(),
  ) { }

  async search(query: string): Promise<RecipesDTO[]> {
    const recipes = await this.recipeRepository.getRecipeBySearch(query);

    if (recipes == null) {
      throw new StatusError(404, 'Nothing in recipes');
    }

    const recipeDTOs: RecipesDTO[] = await Promise.all(recipes.map(async (recipe: Recipe) => {
        const ingredients: IRecipeToIngredient[] = await this.recipeToIngredientRepository.getIngredientsById(recipe.id);
        return toRecipesDTO(recipe.id, recipe.name, recipe.uploadedBy, ingredients);
    }));
    return recipeDTOs;
  }
}
