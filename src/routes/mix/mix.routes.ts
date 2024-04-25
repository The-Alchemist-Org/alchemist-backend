import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IMixService, MixService } from '@root/domains/mix';
import { NextDrinkBody } from './types';

export const mixRoutes = () => {
  const router = Router();
  const mixService: IMixService = new MixService();

  /**
   * @swagger
   * /mix/getnext:
   *  post:
   *    summary: Get next drink
   *    description: "Get the next drink from the queue, belonging to the given machine id"
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/NextDrinkBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/MixDTO'
   */
  router.post(
    '/getnext',
    async (req: Request<null, null, NextDrinkBody>, res: Response) => {
      try {
        const response = await mixService.mix(req.body);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
