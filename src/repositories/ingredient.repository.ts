import { IIngredient, Ingredient } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IIngredientRepository {
  getIngredientById: (ingredientId: number) => Promise<IIngredient | null>,
  getAllIngredients: () => Promise<IIngredient[] | null>,
}

export class IngredientRepository implements IIngredientRepository {
  constructor(private repository: Repository<IIngredient>
  = buildRepository<IIngredient>(Ingredient)) {}

  async getIngredientById(ingredientId: number) {
    return this.repository.findOne({
      where: {
        id: ingredientId,
      },
    });
  }

  async getAllIngredients() {
    return this.repository.find();
  }
}
