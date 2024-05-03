import validationMiddleware from '@root/utils/validationMiddleware';
import { z } from 'zod';

export const doneValidation = validationMiddleware(z.object({
  machineId: z.number().int(),
  queueId: z.number().int(),
}));
