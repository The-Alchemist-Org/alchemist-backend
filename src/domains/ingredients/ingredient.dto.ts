import { IIngredient } from '@root/entities';
import { IngredientDTO } from './types';

export const toIngredientDTO = (
  ingredient: IIngredient,
): IngredientDTO => ({
  id: ingredient.id,
  name: ingredient.name,
});
