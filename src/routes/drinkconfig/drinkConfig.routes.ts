import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { DrinkConfigService, IDrinkConfigService } from '@root/domains/drinkconfig';
import { isAuth } from '@root/middleware/isAuth';
import { AuthRequest } from '@root/types/request';
import { PutBody } from './types';
import { putValidation } from './validation';

export const drinkConfigRoutes = () => {
  const router = Router();
  const drinkConfigService: IDrinkConfigService = new DrinkConfigService();
  /**
   * @swagger
   * /drinkConfig:
   *  put:
   *    summary: change contents of a drink hopper
   *    description: "Set the contents and the amount left of an ingredient"
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/PutBody'
   *    responses:
   *      200:
   *        description: "success"
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      422:
   *        $ref: '#/components/responses/UnprocessableEntityError'
   */
  router.put(
    '/',
    isAuth,
    putValidation,
    async (req: Request<null, null, PutBody> & AuthRequest, res: Response) => {
      try {
        const response = await drinkConfigService.put(req.body);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
