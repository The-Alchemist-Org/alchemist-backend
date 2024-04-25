import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import { DoneBody, NextDrinkBody } from '@root/routes/mix/types';
import { MixDTO } from './types';
import { toMixDTO } from './mix.dto';

export interface IMixService {
  mix(mixBody: NextDrinkBody): Promise<MixDTO>;
  done(doneBody: DoneBody): Promise<boolean>;
}
export class MixService implements IMixService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
  ) { }

  async mix(mixBody: NextDrinkBody): Promise<MixDTO> {
    const recipe = await this.queueRepository.nextUp(mixBody.machineId);
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(mixBody.machineId);
    const mixableIngredients = recipe.recipe.ingredients.filter((ingr) => {
      const test = drinkConfig.find((dc) => dc.ingredient.id === ingr.id);
      return test != null;
    });
    const mixableIngredientMachineSlots = mixableIngredients.map(
      (ingr) => drinkConfig.find((dc) => dc.ingredient.id === ingr.id).id,
    );
    const mixableIngredientQuantities = mixableIngredients.map((ingr) => ingr.quantity);
    return toMixDTO(mixableIngredientMachineSlots, mixableIngredientQuantities);
  }

  async done(doneBody: DoneBody): Promise<boolean> {
    return this.queueRepository.mixDone(doneBody.machineId);
  }
}
