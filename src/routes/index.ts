import { Application } from 'express';
import { authRoutes } from './auth';

const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
};

export default registerRoutes;
