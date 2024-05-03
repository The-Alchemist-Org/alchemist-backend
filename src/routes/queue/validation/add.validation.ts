import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const addValidation = validationMiddleware(z.object({
  recipeId: z.number().int(),
  machineId: z.number().int(),
}));
