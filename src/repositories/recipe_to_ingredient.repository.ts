import { IRecipeToIngredient, RecipeToIngredient } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { DeleteResult, Repository } from 'typeorm';

export interface IRecipeToIngredientRepository {
  getIngredientsById: (recipeId: number) => Promise<IRecipeToIngredient[] | null>;
  save: (ingredient: RecipeToIngredient) => Promise<IRecipeToIngredient>;
  delete: (id: number) => Promise<DeleteResult>;
}

export class RecipeToIngredientRepository implements IRecipeToIngredientRepository {
  constructor(private repository: Repository<IRecipeToIngredient>
  = buildRepository<IRecipeToIngredient>(RecipeToIngredient)) {}

  async getIngredientsById(recipeId: number) {
    return this.repository.createQueryBuilder('recipe_to_ingredient')
      .where('recipe_to_ingredient.recipe_id = :recipeId', { recipeId })
      .getMany();
  }

  async save(ingredient: RecipeToIngredient) {
    return this.repository.save(ingredient);
  }

  async delete(id: number) {
    return this.repository.createQueryBuilder('recipe_to_ingredient')
      .delete()
      .from(RecipeToIngredient)
      .where('recipe_to_ingredient.recipe_id = :id', { id })
      .execute();
  }
}
