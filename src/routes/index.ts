import { Application } from 'express';
import { isAuth } from '@root/middleware/isAuth';
import { authRoutes } from './auth';
import { mixRoutes } from './mix';
import { recipesRoutes } from './recipes';
import { queueRoutes } from './queue';
import { ingredientsRoutes } from './ingredents';

const registerRoutes = async (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/mix', mixRoutes());
  app.use('/recipes', isAuth, recipesRoutes());
  app.use('/queue', queueRoutes());
  app.use('/ingredients', ingredientsRoutes());
};

export default registerRoutes;
