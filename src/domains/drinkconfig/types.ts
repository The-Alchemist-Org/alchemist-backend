import { IngredientDTO } from '../ingredients/types';

export type DrinkConfigDTO = {
  ingredient: IngredientDTO | null;
  amountLeft: number;
  machineId: number;
  hopperNum: number;
};
