import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import StatusError from '@root/utils/statusError';
import { DrinkConfigBody } from '@root/routes/drinkconfig/types';
import { IIngredientRepository, IngredientRepository } from '@root/repositories/ingredient.repository';
import { DrinkConfig } from '@root/entities';
import { DrinkConfigDTO } from './types';
import { toDrinkConfigDTO } from './drinkconfig.dto';

export interface IDrinkConfigService {
  getDrinkConfig(machineId: number): Promise<DrinkConfigDTO[]>
  updataDrinkConfig(putBody: DrinkConfigBody, machineId: number): Promise<DrinkConfigDTO[]>;
}
export class DrinkConfigService implements IDrinkConfigService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
    private ingredientRepository: IIngredientRepository = new IngredientRepository(),
  ) { }

  async getDrinkConfig(machineId: number): Promise<DrinkConfigDTO[]> {
    const drinkConfig = await this.drinkConfigRepository.getMachineConfig(machineId);
    const drinkConfDTOs = drinkConfig.map <Promise<DrinkConfigDTO>>(
      (dk: DrinkConfig) => toDrinkConfigDTO(dk),
    );
    return Promise.all(drinkConfDTOs);
  }

  async updataDrinkConfig(putBody: DrinkConfigBody, machineID: number) {
    const drinkConfigs = await this.drinkConfigRepository.getMachineConfig(machineID);
    if (drinkConfigs.length !== putBody.length) {
      throw new StatusError(400, 'wrong number of drinkConfigs');
    }

    drinkConfigs.forEach(async (dC, i) => {
      drinkConfigs[i].amountLeft = putBody[i].amountLeft;
      drinkConfigs[i].ingredient = await this.ingredientRepository
        .getIngredientById(putBody[i].ingredientId);
    });

    const resp = await this.drinkConfigRepository.saveMany(drinkConfigs);
    const arst = resp.map<Promise<DrinkConfigDTO>>((dc) => toDrinkConfigDTO(dc));
    return Promise.all(arst);
  }
}
