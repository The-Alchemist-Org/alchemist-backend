import StatusError from '@root/utils/statusError';
import { IRecipeRepository, RecipeRepository } from '@root/repositories/recipe.repository';
import { IRecipeToIngredient, Recipe, RecipeToIngredient } from '@root/entities';
import { IRecipeToIngredientRepository, RecipeToIngredientRepository } from '@root/repositories/recipe_to_ingredient.repository';
import { Request } from 'express';
import { RecipeBody } from '@root/routes/recipes/types';
import { UserRepository } from '@root/repositories/user.repository';
import { toRecipesDTO } from './recipes.dto';
import { RecipeServiceResult, RecipesDTO } from './types';

export interface IRecipeService {
  search(req: Request): Promise<RecipeServiceResult>;
  searchById(id: number): Promise<Recipe>;
  addRecipe(body: RecipeBody, userId: number): Promise<Recipe>;
}
export class RecipeService implements IRecipeService {
  constructor(
    private recipeRepository: IRecipeRepository = new RecipeRepository(),
    private recipeToIngredientRepository: IRecipeToIngredientRepository
    = new RecipeToIngredientRepository(),
    private authRepository = new UserRepository(),
  ) { }

  async search(req: Request): Promise<RecipeServiceResult> {
    const recipes = await this.recipeRepository.getRecipeBySearch(req);

    const filterParams = req.query.filter;

    let filterIds: number[] = [];
    if (filterParams) {
      filterIds = filterParams.toString().split(' ').map((id: string) => parseInt(id, 10));
    }

    if (recipes == null) {
      throw new StatusError(404, 'Nothing in recipes');
    }

    let recipeDTOs: RecipesDTO[] = await Promise.all(recipes.results
      .map(async (recipe: Recipe) => {
        const ingredients: IRecipeToIngredient[] = await this.recipeToIngredientRepository
          .getIngredientsById(recipe.id);
        return toRecipesDTO(recipe.id, recipe.name, recipe.uploadedBy, ingredients);
      }));

    recipeDTOs = recipeDTOs.filter((recipe) => {
      const ids = recipe.ingredients.map((ingredient) => ingredient.id);
      if (filterIds.every((id) => ids.includes(id))) {
        return true;
      }
      return false;
    });

    const result: RecipeServiceResult = {
      results: recipeDTOs,
      page: parseInt(req.query.page?.toString(), 10) || 1,
      pageSize: parseInt(req.query.limit?.toString(), 10) || 5,
      totalPages: recipes.totalPages,
    };

    return result;
  }

  async searchById(id: number) {
    const recipe = await this.recipeRepository.getRecipeById(id);
    return recipe;
  }

  async addRecipe(body: RecipeBody, userId: number) {
    const user = this.authRepository.findById(userId);

    if (!user) {
      throw new StatusError(409, 'User does not exist');
    }

    const rec = new Recipe();

    rec.name = body.name;
    rec.uploadedBy = userId;

    const recipe = await this.recipeRepository.save(rec);

    rec.ingredients = await Promise.all(body.ingredients.map((ingredient) => {
      const recti = new RecipeToIngredient();

      recti.ingredientId = ingredient.id;
      recti.recipeId = recipe.id;
      recti.quantity = ingredient.quantity;

      this.recipeToIngredientRepository.saveToDatabase(recti);

      return recti;
    }));

    return recipe;
  }
}
