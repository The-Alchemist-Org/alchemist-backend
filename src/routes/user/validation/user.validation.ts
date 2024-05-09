import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const userValidation = validationMiddleware(z.object({
  password: z.string().min(7),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
}));
