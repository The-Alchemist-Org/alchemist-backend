import { Application } from 'express';
import { authRoutes } from './auth';
import { mixRoutes } from './mix';
import { queueRoutes } from './queue';

const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/mix', mixRoutes());
  app.use('/queue', queueRoutes());
};

export default registerRoutes;
