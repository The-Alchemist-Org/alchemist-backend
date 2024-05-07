import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IRecipeService, RecipeService } from '@root/domains/recipes';

export const recipesRoutes = () => {
  const router = Router();
  const recipeService: IRecipeService = new RecipeService();

  /**
   * @swagger
   * /recipes:
   *  get:
   *    summary: Get recipes based on search
   *    description: "Get recipes based on parameters"
   *    parameters:
   *    - in: query
   *      name: search
   *      description: The name of the recipe
   *      required: true
   *    responses:
   *      200:
   *        $ref: '#/components/responses/RecipesDTO'
   *      500:
   *        $ref: '#/components/responses/InternalError'
   *
   */

  router.get(
    '/',
    async (req: Request, res: Response) => {
      try {
        const recipes = await recipeService.search(req);
        return res.status(200).send(recipes);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
