import { Application } from 'express';
import { authRoutes } from './auth';
import { mixRoutes } from './mix';
import { recipesRoutes } from './recipes';
import { queueRoutes } from './queue';
import { ingredientsRoutes } from './ingredents';

const registerRoutes = async (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/mix', mixRoutes());
  app.use('/recipes', recipesRoutes());
  app.use('/queue', queueRoutes());
  app.use('/ingredients', ingredientsRoutes());
};

export default registerRoutes;
