import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const recipeValidation = validationMiddleware(z.object({
  name: z.string().min(0),
  ingredients: z.array(z.object({
    id: z.number().int(),
    quantity: z.number().int(),
  })),
}));
