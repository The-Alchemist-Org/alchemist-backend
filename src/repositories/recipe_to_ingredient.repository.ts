import { IRecipeToIngredient, RecipeToIngredient } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IRecipeToIngredientRepository {
  getIngredientsById: (recipeId: number) => Promise<IRecipeToIngredient[] | null>;
  saveToDatabase: (ingredient: RecipeToIngredient) => Promise<IRecipeToIngredient>;
}

export class RecipeToIngredientRepository implements IRecipeToIngredientRepository {
  constructor(private repository: Repository<IRecipeToIngredient>
  = buildRepository<IRecipeToIngredient>(RecipeToIngredient)) {}

  async getIngredientsById(recipeId: number) {
    return this.repository.createQueryBuilder('recipe_to_ingredient')
      .where('recipe_to_ingredient.recipe_id = :recipeId', { recipeId })
      .getMany();
  }

  async saveToDatabase(ingredient: RecipeToIngredient) {
    return this.repository.save(ingredient);
  }
}
