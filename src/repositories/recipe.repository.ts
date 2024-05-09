import { IRecipe, Recipe } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Request } from 'express';
import { DeleteResult, Repository } from 'typeorm';

export interface RecipeSearchResult {
  results: IRecipe[],
  totalPages: number,
}

export interface IRecipeRepository {
  getRecipeById: (recipeId: number) => Promise<IRecipe | null>;
  getRecipeBySearch: (req: Request) => Promise<RecipeSearchResult | null>;
  save: (queue: IRecipe) => Promise<Recipe>;
  delete: (recipeId: number) => Promise<DeleteResult>;
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

  async getRecipeBySearch(req: Request) {
    const search = req.query.search || '';
    const page = parseInt(req.query.page?.toString(), 10) - 1 || 0;
    const limit = parseInt(req.query.limit?.toString(), 10) || 5;

    const totalCount = await this.repository
      .createQueryBuilder('recipe')
      .where('recipe.name ILIKE :search', { search: `%${search}%` })
      .getCount();

    const results = await this.repository.createQueryBuilder('recipe')
      .where('recipe.name ILIKE :search', { search: `%${search}%` })
      .offset(page * limit)
      .limit(limit)
      .getMany();

    const totalPages = Math.ceil(totalCount / limit);

    return { results, totalPages };
  }

  async save(recipe: IRecipe) {
    return this.repository.save(recipe);
  }

  async delete(recipeId: number) {
    return this.repository.createQueryBuilder('recipes')
      .delete()
      .where('recipes.id = :id', { id: recipeId })
      .execute();
  }
}
