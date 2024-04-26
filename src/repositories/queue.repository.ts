import { IQueue, Queue } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { IsNull, Repository } from 'typeorm';

export interface IQueueRepository {
  getNextQueueItemByMachineId: (machineId: number) => Promise<IQueue | null>;
  save: (queue: IQueue) => Promise<Queue>;
}

export class QueueRepository implements IQueueRepository {
  constructor(private repository: Repository<IQueue> = buildRepository<IQueue>(Queue)) {}

  async getNextQueueItemByMachineId(machineId: number) {
    return this.repository.findOne({
      where: {
        doneAt: IsNull(),
        serialNumber: machineId,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async save(queue: IQueue) {
    return this.repository.save(queue);
  }
}
