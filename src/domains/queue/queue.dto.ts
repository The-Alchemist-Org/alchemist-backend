import { IQueue } from '@root/entities';
import { QueueDTO } from './types';

export const toQueueDTO = async (
  queueItem: IQueue,
): Promise<QueueDTO> => ({
  queueID: queueItem.id,
  recipeID: queueItem.recipe.id,
  machineID: queueItem.serialNumber,
});
