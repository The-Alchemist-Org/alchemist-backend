import { DrinkConfig, IDrinkConfig } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IDrinkConfigRepository {
  getMachineConfig: (machineId: number) => Promise<IDrinkConfig[]>;
  getDrinkConfigByMachineAndHopper: (machineId: number, hopperNum: number) => Promise<IDrinkConfig>;
  save: (drinkConfig: IDrinkConfig) => Promise<IDrinkConfig>
  saveMany: (drinkConfig: IDrinkConfig[]) => Promise<IDrinkConfig[]>
  deleteByMachineId: (machineId: number) => Promise<any>
}

export class DrinkConfigRepository implements IDrinkConfigRepository {
  constructor(private repository: Repository<IDrinkConfig> =
  buildRepository<IDrinkConfig>(DrinkConfig)) {}

  getMachineConfig(machineId: number) {
    return this.repository.find({
      where: {
        serialNumber: machineId,
      },
      relations: {
        ingredient: true,
      },
      order: {
        hopperNum: 'ASC',
      },
    });
  }

  getDrinkConfigByMachineAndHopper(machineId: number, hopperNum: number) {
    return this.repository.findOne({
      where: {
        serialNumber: machineId,
        hopperNum,
      },
      relations: {
        ingredient: true,
      },
    });
  }

  save(drinkConfig: IDrinkConfig) {
    return this.repository.save(drinkConfig);
  }

  saveMany(drinkConfigs: IDrinkConfig[]) {
    return this.repository.save(drinkConfigs);
  }

  deleteByMachineId(machineId: number) {
    return this.repository.delete({ serialNumber: machineId });
  }
}
