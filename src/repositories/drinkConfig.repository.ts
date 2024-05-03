import { DrinkConfig, IDrinkConfig } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IDrinkConfigRepository {
  getMachineConfig: (machineId: number) => Promise<IDrinkConfig[]>;
}

export class DrinkConfigRepository implements IDrinkConfigRepository {
  constructor(private repository: Repository<IDrinkConfig> =
  buildRepository<IDrinkConfig>(DrinkConfig)) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMachineConfig(machineId: number) {
    // TODO machine ID not yet implemented in this table
    return this.repository.find({
      relations: {
        ingredient: true,
      },
    });
  }
}
