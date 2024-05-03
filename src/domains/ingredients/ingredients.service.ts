import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { IRecipeRepository, RecipeRepository } from '@root/repositories/recipe.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import { IngredientDTO } from './types';
import { toIngredientDTO } from './ingredient.dto';

export interface IIngredientsService {
  present(machineID: number): Promise<IngredientDTO[]>;
}
export class IngredientsService implements IIngredientsService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private recipeRepository: IRecipeRepository = new RecipeRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
  ) { }

  async present(mixerID: number) {
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(mixerID);
    const ingredients = drinkConfig.map<Promise<IngredientDTO>>(
      (drink) => toIngredientDTO(drink.ingredient),
    );
    return Promise.all(ingredients);
  }
}
