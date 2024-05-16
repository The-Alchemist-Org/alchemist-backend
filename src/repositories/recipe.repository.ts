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
    const page = (parseInt(req.query.page?.toString(), 10) - 1 || 0) + 1;
    const limit = parseInt(req.query.limit?.toString(), 10) || 5;

    const totalCountQueryBuilder = this.repository.createQueryBuilder('recipe');
    totalCountQueryBuilder.where('recipe.name ILIKE :search', { search: `%${search}%` });
    if (req.query.uploadedBy) {
      totalCountQueryBuilder.andWhere('recipe.uploadedBy = :uploadedBy', { uploadedBy: req.query.uploadedBy });
    }
    const totalCount = await totalCountQueryBuilder.getCount();

    const queryBuilder = this.repository.createQueryBuilder('recipe');

    queryBuilder.where('recipe.name ILIKE :search', { search: `%${search}%` });
    if (req.query.uploadedBy) {
      queryBuilder.andWhere('recipe.uploadedBy = :uploadedBy', { uploadedBy: req.query.uploadedBy });
    }
    const results = await queryBuilder.offset(page * limit).limit(limit).getMany();

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
