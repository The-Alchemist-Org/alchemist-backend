import { IRecipe, Recipe } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IRecipeRepository {
  getRecipeById: (recipeId: number) => Promise<IRecipe | null>;
  getRecipeBySearch: (search: string) => Promise<IRecipe[] | null>;
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

  async getRecipeBySearch(search: string){
    return this.repository.createQueryBuilder('recipe')
      .where('recipe.name ILIKE :search', { search: `%${search}%`})
      .getMany();
  }

  async save(recipe: IRecipe) {
    return this.repository.save(recipe);
  }
}
