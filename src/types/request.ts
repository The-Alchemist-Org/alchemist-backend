import { UserTokenDestructured } from '@entities/user.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  auth: UserTokenDestructured
}
