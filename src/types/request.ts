import { UserTokenDestructured } from '@entities/user';
import { Request } from 'express';

export interface AuthRequest extends Request {
  auth: UserTokenDestructured
}
