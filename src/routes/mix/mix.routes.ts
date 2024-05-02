import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IMixService, MixService } from '@root/domains/mix';
import { DoneBody } from './types';
import { doneValidation } from './validation';

export const mixRoutes = () => {
  const router = Router();
  const mixService: IMixService = new MixService();

  // TODO: i didnt know how to write swagger for url parameters
  /**
   * @swagger
   * /mix/:mixerid/next:
   *  get:
   *    summary: Get mix instructions for next drink
   *    description: "Get the next drink from the queue, belonging to the given machine id"
   *    responses:
   *      200:
   *        $ref: '#/components/responses/MixDTO'
   *      404:
   *        $ref: '#/components/responses/QueueEmptyNotice'
   *
   */
  router.get(
    '/:mixerId/next',
    async (req: Request, res: Response) => {
      try {
        const mixerId = parseInt(req.params.mixerId, 10);
        const response = await mixService.mix(mixerId);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  /**
   * @swagger
   * /mix/done:
   *  post:
   *    summary: Indicate mixing done
   *    description: "Indicate that the machine is done mixing, queue will move forward by one"
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/DoneBody'
   *    responses:
   *      200:
   *        description: "success"
   *      422:
   *        $ref: '#/components/responses/UnprocessableEntityError'
   */
  router.post(
    '/done',
    doneValidation,
    async (req: Request<null, null, DoneBody>, res: Response) => {
      try {
        const response = await mixService.done(req.body);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
