import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const loginValidation = validationMiddleware(z.object({
  email: z.string().email(),
  password: z.string().min(7),
}));
