import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IQueueService, QueueService } from '@root/domains/queue';
import { isAuth } from '@root/middleware/isAuth';
import { AddToQueueBody } from './types';
import { addValidation } from './validation';

export const queueRoutes = () => {
  const router = Router();
  const queueService: IQueueService = new QueueService();

  /**
   * @swagger
   * /queue/add:
   *  post:
   *    summary: Add recipe to queue
   *    description: "Add a recipe to the queue by recipe id and machine id"
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/AddToQueueBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/QueueID'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   */
  router.post(
    '/add',
    isAuth,
    addValidation,
    async (req: Request<null, null, AddToQueueBody>, res: Response) => {
      try {
        const response = await queueService.add(req.body);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
