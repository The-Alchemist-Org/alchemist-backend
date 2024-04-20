import { IIngredient } from '@root/entities/ingredient';

export interface IDrinkConfig {
  id: number;
  ingredient: IIngredient;
  amountLeft: number;
}
