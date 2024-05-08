import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { IRecipeRepository, RecipeRepository } from '@root/repositories/recipe.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import { IIngredientRepository, IngredientRepository } from '@root/repositories/ingredient.repository';
import { IngredientDTO } from './types';
import { toIngredientDTO } from './ingredient.dto';

export interface IIngredientsService {
  present(machineId: number): Promise<IngredientDTO[]>;
  all(): Promise<IngredientDTO[]>;
}
export class IngredientsService implements IIngredientsService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private recipeRepository: IRecipeRepository = new RecipeRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
    private ingredientRepository: IIngredientRepository = new IngredientRepository(),
  ) { }

  async present(mixerId: number) {
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(mixerId);
    const ingredients = drinkConfig.map<Promise<IngredientDTO>>(
      (drink) => toIngredientDTO(drink.ingredient),
    );
    return Promise.all(ingredients);
  }

  async all() {
    const ingredients = await this.ingredientRepository.getAllIngredients();
    return Promise.all(ingredients);
  }
}
