import { MixDTO } from './types';

export const toMixDTO = async (
  ingredientSlots: number[],
  ingredientQuantities: number[],
): Promise<MixDTO> => ({
  ingredients: ingredientSlots,
  quantities: ingredientQuantities,
});
