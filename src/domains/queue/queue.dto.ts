import { IQueue } from '@root/entities';
import { QueueDTO } from './types';

export const toQueueDTO = async (
  queueItem: IQueue,
): Promise<QueueDTO> => ({
  queueId: queueItem.id,
  recipeId: queueItem.recipe.id,
  machineId: queueItem.serialNumber,
});
