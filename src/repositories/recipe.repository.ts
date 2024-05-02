import { IRecipe, Recipe } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IRecipeRepository {
  getRecipeById: (recipeId: number) => Promise<IRecipe | null>;
  save: (queue: IRecipe) => Promise<Recipe>;
}

export class RecipeRepository implements IRecipeRepository {
  constructor(private repository: Repository<IRecipe> = buildRepository<IRecipe>(Recipe)) {}

  async getRecipeById(recipeId: number) {
    return this.repository.findOne({
      where: {
        id: recipeId,
      },
      relations: {
        ingredients: true,
      },
    });
  }

  async save(recipe: IRecipe) {
    return this.repository.save(recipe);
  }
}
