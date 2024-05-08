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
   *    - in: query
   *      name: page
   *      description: The current page
   *      required: false
   *    - in: query
   *      name: limit
   *      description: Limit to amount of entries to fetch
   *      required: false
   *    - in: query
   *      name: filter
   *      description: Ids of ingredients to filter
   *      required: false
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

  router.get(
    '/:id',
    async (req: Request, res: Response) => {
      try {
        const recipe = await recipeService.searchById(parseInt(req.params.id, 10));
        return res.status(200).send(recipe);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );
  return router;
};
