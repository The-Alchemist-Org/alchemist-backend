import { IIngredient } from '@root/entities';
import { IngredientDTO } from './types';

export const toIngredientDTO = async (
  ingredient: IIngredient,
): Promise<IngredientDTO> => ({
  id: ingredient.id,
  name: ingredient.name,
});
