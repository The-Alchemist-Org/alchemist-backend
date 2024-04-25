import { IQueue, Queue } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { IsNull, Repository } from 'typeorm';

export interface IQueueRepository {
  nextUp: (machineId: number) => Promise<IQueue | null>;
  mixDone: (machineId: number) => Promise<boolean>;
}

export class QueueRepository implements IQueueRepository {
  constructor(private repository: Repository<IQueue> = buildRepository<IQueue>(Queue)) {}

  async nextUp(machineId: number) {
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

  async mixDone(machineId: number) {
    const doneQueueItem = await this.nextUp(machineId);
    doneQueueItem.doneAt = new Date();
    this.repository.save(doneQueueItem);

    return true;
  }
}
