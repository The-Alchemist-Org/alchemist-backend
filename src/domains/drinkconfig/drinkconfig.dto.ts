import { IDrinkConfig } from '@root/entities';
import { DrinkConfigDTO } from './types';
import { toIngredientDTO } from '../ingredients/ingredient.dto';

export const toDrinkConfigDTO = (
  drinkConfig: IDrinkConfig,
): DrinkConfigDTO => ({
  ingredient: drinkConfig.ingredient ? toIngredientDTO(drinkConfig.ingredient) : null,
  amountLeft: drinkConfig.amountLeft,
  machineId: drinkConfig.serialNumber,
  hopperNum: drinkConfig.hopperNum,
});
