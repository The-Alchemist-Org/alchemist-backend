import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const putValidation = validationMiddleware(z.object({
  machineId: z.number().int(),
  dispenserId: z.number().int(),
  ingredientId: z.number().nullable(),
  amountLeft: z.number().int(),
}));
