import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { isAuth } from '@root/middleware/isAuth';
import { IIngredientsService, IngredientsService } from '@root/domains/ingredients';

export const ingredientsRoutes = () => {
  const router = Router();
  const ingredientsService: IIngredientsService = new IngredientsService();

  /**
   * @swagger
   * /ingredients/:mixerId/present:
   *  post:
   *    summary: get ingredients present in the machine
   *    description: "get all ingredients present in the mixer with id :mixerId"
   *    responses:
   *      200:
   *        $ref: '#/components/responses/IngredientsDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   */
  router.get(
    '/:mixerId/present',
    isAuth,
    async (req: Request, res: Response) => {
      try {
        const mixerId = parseInt(req.params.mixerId, 10);
        const response = await ingredientsService.present(mixerId);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  /**
   * @swagger
   * /ingredients/all:
   *  post:
   *    summary: get all ingredients
   *    description: "get all ingredients present in the database"
   *    responses:
   *      200:
   *        $ref: '#/components/responses/IngredientsDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   */
  router.get(
    '/all',
    isAuth,
    async (req: Request, res: Response) => {
      try {
        const response = await ingredientsService.all();
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
