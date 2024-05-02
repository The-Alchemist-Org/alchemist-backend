import { Application } from 'express';
import { authRoutes } from './auth';
import { mixRoutes } from './mix';

const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/mix', mixRoutes());
};

export default registerRoutes;
