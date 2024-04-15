import { Request as ExpressRequest, Response } from 'express';
import { Schema } from 'zod';

/**
 * Used to generate the validation wrapper middleware.
 */
const validationMiddleware = (schema: Schema) => async (
  req: ExpressRequest,
  res: Response,
  next: Function,
) => {
  const { body } = req;
  try {
    // @ts-ignore -- TODO Add ValidatedRequest type
    req.validatedBody = await schema.parseAsync(body);
    return next();
  } catch (error) {
    return res.status(422).send({
      message: 'Validation Error',
      data: error.issues,
    });
  }
};

export default validationMiddleware;
