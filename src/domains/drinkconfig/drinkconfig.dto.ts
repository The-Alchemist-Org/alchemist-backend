import { IDrinkConfig } from '@root/entities';
import { DrinkConfigDTO } from './types';

export const toDrinkConfigDTO = async (
  drinkConfig: IDrinkConfig,
): Promise<DrinkConfigDTO> => ({
  ingredient: drinkConfig.ingredient ? drinkConfig.ingredient.id : null,
  amountLeft: drinkConfig.amountLeft,
  machineId: drinkConfig.serialNumber,
  hopperNum: drinkConfig.hopperNum,
});
