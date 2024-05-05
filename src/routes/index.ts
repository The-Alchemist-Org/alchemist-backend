import { Application } from 'express';
import { authRoutes } from './auth';
import { mixRoutes } from './mix';
import { recipesRoutes } from './recipes';

const registerRoutes = async (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/mix', mixRoutes());
  app.use('/recipes', recipesRoutes());
};

export default registerRoutes;
