import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import StatusError from '@root/utils/statusError';
import { DrinkConfigBody } from '@root/routes/drinkconfig/types';
import { IIngredientRepository, IngredientRepository } from '@root/repositories/ingredient.repository';
import { DrinkConfig } from '@root/entities';
import { DrinkConfigDTO } from './types';
import { toDrinkConfigDTO } from './drinkconfig.dto';

export interface IDrinkConfigService {
  getDrinkConfig(machineId: number): Promise<DrinkConfigDTO[]>;
  updataDrinkConfig(putBody: DrinkConfigBody, machineId: number): Promise<DrinkConfigDTO[]>;
}
export class DrinkConfigService implements IDrinkConfigService {
  constructor(
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
    private ingredientRepository: IIngredientRepository = new IngredientRepository(),
  ) { }

  async getDrinkConfig(machineId: number): Promise<DrinkConfigDTO[]> {
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(machineId);
    if (!drinkConfig) {
      throw new StatusError(404, 'Drink config not found');
    }
    return drinkConfig.map(toDrinkConfigDTO);
  }

  async updataDrinkConfig(putBody: DrinkConfigBody, machineID: number) {
    await this.drinkConfigRepository.deleteByMachineId(machineID);

    const drinkConfigs = await Promise.all(putBody.map(async (dC, index) => {
      const drinkConfig = new DrinkConfig();
      drinkConfig.serialNumber = machineID;
      drinkConfig.hopperNum = index + 1;
      drinkConfig.amountLeft = dC.amountLeft;
      drinkConfig.ingredient = await this.ingredientRepository.getIngredientById(dC.ingredientId);
      return drinkConfig;
    }));

    const resp = await this.drinkConfigRepository.saveMany(drinkConfigs);
    return resp.map(toDrinkConfigDTO);
  }
}
