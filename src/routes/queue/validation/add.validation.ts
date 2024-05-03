import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const addValidation = validationMiddleware(z.object({
  recipeID: z.number().int(),
  machineID: z.number().int(),
}));
