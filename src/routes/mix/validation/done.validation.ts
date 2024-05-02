import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const doneValidation = validationMiddleware(z.object({
  machineID: z.number().int(),
  queueID: z.number().int(),
}));
