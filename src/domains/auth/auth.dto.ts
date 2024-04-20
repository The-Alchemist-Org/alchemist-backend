import { IUser } from '@root/entities';
import { AuthDTO } from './types';

export const toAuthDTO = async (user: IUser, buildToken: boolean = true): Promise<AuthDTO> => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  token: buildToken ? await user.buildToken() : undefined,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
