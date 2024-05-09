import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

const drinkConfigSchema = z.object({
  ingredientId: z.number().nullable(),
  amountLeft: z.number().int(),
});

export const drinkConfigsValidation = validationMiddleware(z.array(drinkConfigSchema));
