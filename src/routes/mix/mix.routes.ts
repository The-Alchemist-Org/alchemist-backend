import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IMixService, MixService } from '@root/domains/mix';

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
   */
  router.get(
    ':mixerId/next',
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

  // TODO: i didnt know how to write swagger for url parameters
  /**
   * @swagger
   * /mix/:mixerid/done:
   *  post:
   *    summary: Indicate mixing done
   *    description: "Indicate that the machine is done mixing, queue will move forward by one"
   *    responses:
   *      200:
   *        application/json:
   *          properties:
   *            success:
   *              type: boolean
   *              required: true
   *
   */
  router.post(
    ':mixerId/done',
    async (req: Request, res: Response) => {
      try {
        const mixerId = parseInt(req.params.mixerId, 10);
        const response = await mixService.done(mixerId);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
