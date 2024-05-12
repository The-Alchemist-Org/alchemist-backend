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
   *      201:
   *        $ref: '#/components/responses/RecipeReponse'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *
   */
  router.post(
    '/',
    recipeValidation,
    async (req: Request<null, null, RecipeBody> & AuthRequest, res: Response) => {
      try {
        const recipe = await recipeService.addRecipe(req.body, req.auth.id);
        return res.status(201).send(recipe);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  /**
   * @swagger
   * /recipes/{id}:
   *  delete:
   *    tags:
   *      - Recipe
   *    summary: Delete a single recipe based on id
   *    description: "Fetch a recipe from database with a parameter of id."
   *    parameters:
   *    - in: path
   *      name: id
   *      description: Id of recipe
   *      required: true
   *    responses:
   *      204:
   *        description: OK No Content
   *      403:
   *        $ref: '#/components/responses/ForbiddenError'
   *
   */
  router.delete(
    '/:id',
    async (req: Request & AuthRequest, res: Response) => {
      try {
        const result = await recipeService.deleteRecipe(parseInt(req.params.id, 10), req.auth.id);
        return res.status(204).send(result);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  /**
   * @swagger
   * /recipes/{id}:
   *  put:
   *    tags:
   *      - Recipe
   *    summary: Updates a recipe in database
   *    description: "Try to update a recipe in database"
   *    parameters:
   *    - in: path
   *      name: id
   *      description: Id of recipe
   *      required: true
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/RecipeBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/RecipeReponse'
   *      403:
   *        $ref: '#/components/responses/ForbiddenError'
   */
  router.put(
    '/:id',
    recipeValidation,
    async (req: Request<{ id: string }, null, RecipeBody> & AuthRequest, res: Response) => {
      try {
        const recipe = await recipeService
          .updateRecipe(parseInt(req.params.id, 10), req.body, req.auth.id);
        return res.status(200).send(recipe);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );
  return router;
};
