import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IRecipeService, RecipeService } from '@root/domains/recipes';
import { AuthRequest } from '@root/types/request';
import { RecipeBody } from './types';
import { recipeValidation } from './validation/recipes.validation';

export const recipesRoutes = () => {
  const router = Router();
  const recipeService: IRecipeService = new RecipeService();

  /**
   * @swagger
   * /recipes:
   *  get:
   *    tags:
   *      - Recipe
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

  /**
   * @swagger
   * /recipes/{id}:
   *  get:
   *    tags:
   *      - Recipe
   *    summary: Get a single recipe based on id
   *    description: "Fetch a recipe from database with a parameter of id"
   *    parameters:
   *    - in: path
   *      name: id
   *      description: Id of recipe
   *      required: true
   *    responses:
   *      200:
   *        $ref: '#/components/responses/RecipeReponse'
   *      500:
   *        $ref: '#/components/responses/InternalError'
   *
   */

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

  /**
   * @swagger
   * /recipes:
   *  post:
   *    tags:
   *      - Recipe
   *    summary: Add a recipe to database
   *    description: "Reigster a new recipe to database"
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/RecipeBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/RecipeReponse'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      409:
   *        $ref: '#/components/responses/UnauthorizedError'
   *
   */

  router.post(
    '/',
    recipeValidation,
    async (req: Request<null, null, RecipeBody> & AuthRequest, res: Response) => {
      try {
        const recipe = await recipeService.addRecipe(req.body, req.auth.id);
        return res.status(200).send(recipe);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );
  return router;
};
