import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import { Queue } from '@root/entities';
import { MixDTO } from './types';
import { toMixDTO } from './mix.dto';

export interface IMixService {
  mix(machineId: number): Promise<MixDTO>;
  done(machineId: number): Promise<Queue>;
}
export class MixService implements IMixService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
  ) { }

  async mix(machineId: number): Promise<MixDTO> {
    const qitem = await this.queueRepository.getNextQueueItemByMachineId(machineId);
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(machineId);
    const mixableIngredients = qitem.recipe.ingredients.filter((ingr) => {
      const test = drinkConfig.find((dc) => dc.ingredient.id === ingr.ingredientId);
      return test != null;
    });
    console.log('mixableIngredients');
    console.log(mixableIngredients);

    console.log(`drinkConfig: ${JSON.stringify(drinkConfig)}`);

    const mixableIngredientMachineSlots = mixableIngredients.map(
      (ingr) => drinkConfig.find((dc) => dc.ingredient.id === ingr.ingredientId).id,
    );
    const mixableIngredientQuantities = mixableIngredients.map((ingr) => ingr.quantity);
    return toMixDTO(mixableIngredientMachineSlots, mixableIngredientQuantities);
  }

  async done(machineId: number) {
    const doneQueueItem = await this.queueRepository.getNextQueueItemByMachineId(
      machineId,
    );
    doneQueueItem.doneAt = new Date();
    return this.queueRepository.save(doneQueueItem);
  }
}
