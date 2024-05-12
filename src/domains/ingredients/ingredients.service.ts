import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import { IIngredientRepository, IngredientRepository } from '@root/repositories/ingredient.repository';
import { IngredientDTO } from './types';
import { toIngredientDTO } from './ingredient.dto';

export interface IIngredientsService {
  fetchPresentIngredients(machineId: number): Promise<IngredientDTO[]>;
  fetchAllIngredients(): Promise<IngredientDTO[]>;
}
export class IngredientsService implements IIngredientsService {
  constructor(
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
    private ingredientRepository: IIngredientRepository = new IngredientRepository(),
  ) { }

  async fetchPresentIngredients(mixerId: number) {
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(mixerId);
    const ingredients = drinkConfig.map<Promise<IngredientDTO>>(
      (drink) => toIngredientDTO(drink.ingredient),
    );
    return Promise.all(ingredients);
  }

  async fetchAllIngredients() {
    const ingredients = await this.ingredientRepository.getAllIngredients();
    const ingredientDTOs = ingredients.map<Promise<IngredientDTO>>(
      (ingredient) => toIngredientDTO(ingredient),
    );
    return Promise.all(ingredientDTOs);
  }
}
