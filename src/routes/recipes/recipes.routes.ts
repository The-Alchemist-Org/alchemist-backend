import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { Recipe } from '@root/entities/recipe.entity';
import { RecipeToIngredient } from '@root/entities';
import ormconfig from '@root/database/ormconfig';

export const recipesRoutes = () => {
  const router = Router();
  router.get(
    '/',
    async (req: Request, res: Response) => {
      try {
        const { search } = req.query;
        const recipeRepo = ormconfig.getRepository(Recipe);
        const recipeToIngredientRepo = ormconfig.getRepository(RecipeToIngredient);

        const recipes = await recipeRepo.query(`SELECT * FROM recipes WHERE name ~* $1`, [`.*${search}.*`]);
        const recipeList = await Promise.all(recipes.map(async (recipe: Recipe) => {
          const temp = new Recipe();
          temp.id = recipe.id;
          temp.name = recipe.name;
          temp.uploadedBy = recipe.uploadedBy;

          const ingredients = await recipeToIngredientRepo.query(`SELECT * FROM recipe_to_ingredient where recipe_id = ${temp.id}`);
          temp.ingredients = ingredients;

          return temp;
        }));
        return res.status(200).send(recipeList);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
