import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { Queue } from '@root/entities';
import { AddToQueueBody } from '@root/routes/queue/types';
import { IRecipeRepository, RecipeRepository } from '@root/repositories/recipe.repository';
import StatusError from '@root/utils/statusError';
import { toQueueDTO } from './queue.dto';
import { QueueDTO } from './types';

export interface IQueueService {
  add(addToQueueBody: AddToQueueBody): Promise<QueueDTO>;
}
export class QueueService implements IQueueService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private recipeRepository: IRecipeRepository = new RecipeRepository(),
  ) { }

  async add(addToQueueBody: AddToQueueBody) {
    if (addToQueueBody.recipeId == null || addToQueueBody.machineId == null) { throw new StatusError(400, 'bad request'); }
    const newQueueItem = new Queue();
    const recipe = await this.recipeRepository.getRecipeById(addToQueueBody.recipeId);
    newQueueItem.recipe = recipe;
    newQueueItem.serialNumber = addToQueueBody.machineId;
    const savedQueueItem = await this.queueRepository.save(newQueueItem);
    return toQueueDTO(savedQueueItem);
  }
}
