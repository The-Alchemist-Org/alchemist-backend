import { Application } from 'express';
import { isAuth } from '@root/middleware/isAuth';
import { authRoutes } from './auth';
import { mixRoutes } from './mix';
import { recipesRoutes } from './recipes';
import { queueRoutes } from './queue';
import { ingredientsRoutes } from './ingredents';
import { drinkConfigRoutes } from './drinkconfig';
import { userRoutes } from './user';

const registerRoutes = async (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/mix', mixRoutes());
  app.use('/recipes', isAuth, recipesRoutes());
  app.use('/users', isAuth, userRoutes());
  app.use('/queue', queueRoutes());
  app.use('/ingredients', ingredientsRoutes());
  app.use('/drinkConfig', drinkConfigRoutes());
};

export default registerRoutes;
