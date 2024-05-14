import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import { Queue } from '@root/entities';
import { DoneBody } from '@root/routes/mix/types';
import StatusError from '@root/utils/statusError';
import { MixDTO } from './types';
import { toMixDTO } from './mix.dto';

export interface IMixService {
  mix(machineId: number): Promise<MixDTO>;
  done(doneBody: DoneBody): Promise<Queue>;
}
export class MixService implements IMixService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
  ) { }

  async mix(machineId: number): Promise<MixDTO> {
    const qitem = await this.queueRepository.getNextQueueItemByMachineId(machineId);
    if (qitem == null) {
      throw new StatusError(404, 'Nothing in queue');
    }
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(machineId);
    const mixableIngredients = qitem.recipe.ingredients.filter((ingr) => {
      const test = drinkConfig.find((dc) => dc.ingredient?.id === ingr.ingredientId);
      return test != null;
    });
    const mixableIngredientMachineSlots = mixableIngredients.map(
      (ingr) => drinkConfig.find((dc) => dc.ingredient.id === ingr.ingredientId).hopperNum,
    );
    const mixableIngredientQuantities = mixableIngredients.map((ingr) => ingr.quantity);
    return toMixDTO(mixableIngredientMachineSlots, mixableIngredientQuantities, qitem.id);
  }

  async done(doneBody: DoneBody) {
    const doneQueueItem = await this.queueRepository.getQueueItemById(
      doneBody.queueId,
    );
    if (doneQueueItem == null) {
      throw new StatusError(409, 'No such queue item');
    }
    if (doneQueueItem.serialNumber !== doneBody.machineId) {
      throw new StatusError(409, 'This queue item belongs to another machine.');
    }
    /* if (doneQueueItem.doneAt !== null) {
      throw new StatusError(409, 'This queue item is already done.');
    } */
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(
      doneQueueItem.serialNumber,
    );
    const updatedDrinkConfig = drinkConfig.map((dc, i) => {
      if (dc.ingredient != null) {
        drinkConfig[i].amountLeft
       -= doneQueueItem.recipe.ingredients.find(
            (rtoi) => rtoi.ingredientId === dc.ingredient.id,
          ).quantity;
      }
      return drinkConfig[i];
    });

    doneQueueItem.doneAt = new Date();
    this.drinkConfigRepository.saveMany(updatedDrinkConfig);
    return this.queueRepository.save(doneQueueItem);
  }
}

/*
INSERT INTO queues (serial_number, recipe_id) VALUES (3,7)
INSERT INTO drink_config (ingredient, amount_left, hopper_num, serial_number) VALUES (1,1000,1,3),(null,1000,2,3),(null,1000,3,3),(2,1000,4,3),(null,1000,5,3);
*/
