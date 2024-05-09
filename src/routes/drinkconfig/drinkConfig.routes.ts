import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { DrinkConfigService, IDrinkConfigService } from '@root/domains/drinkconfig';
import { isAuth } from '@root/middleware/isAuth';
import { AuthRequest } from '@root/types/request';
import { DrinkConfigBody } from './types';
import { drinkConfigsValidation } from './validation';

export const drinkConfigRoutes = () => {
  const router = Router();
  const drinkConfigService: IDrinkConfigService = new DrinkConfigService();

  // TODO
  /**
   * @swagger
   * /drinkConfig/{machineId}:
   *  get:
   *    summary: get drink config based on machine id
   *    description: "Fetch the contents and the amounts left of the ingredients in the machine"
   *    tags:
   *       - DrinkConfig
   *    parameters:
   *      - in: path
   *        name: machineId
   *        description: Id of the machine
   *        required: true
   *    responses:
   *      200:
   *        $ref: '#/components/responses/DrinkConfigDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   */
  router.get(
    '/:machineId',
    // isAuth,
    async (req: Request, res: Response) => {
      try {
        const recipes = await drinkConfigService.getDrinkConfig(parseInt(req.params.machineId, 10));
        return res.status(200).send(recipes);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  // TODO
  /**
   * @swagger
   * /drinkConfig/{machineId}:
   *  put:
   *    summary: change contents of the drink hoppers
   *    description: "Set the contents and the amount left of the drink hoppers, order is 1,2,3..."
   *    tags:
   *       - DrinkConfig
   *    parameters:
   *      - in: path
   *        name: machineId
   *        description: Id of the machine
   *        required: true
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/DrinkConfigPutBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/DrinkConfigDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   */
  router.put(
    '/:machineId',
    // isAuth,
    drinkConfigsValidation,
    async (req: Request<any, null, DrinkConfigBody[]> & AuthRequest, res: Response) => {
      try {
        const response = await drinkConfigService.updataDrinkConfig(
          req.body,
          parseInt(req.params.machineId, 10),
        );
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
