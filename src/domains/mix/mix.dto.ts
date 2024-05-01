import { MixDTO } from './types';

export const toMixDTO = async (
  ingredientSlots: number[],
  ingredientQuantities: number[],
  queueID: number,
): Promise<MixDTO> => ({
  ingredients: ingredientSlots,
  quantities: ingredientQuantities,
  queueID,
});
