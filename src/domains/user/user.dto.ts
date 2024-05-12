import { IUser } from '@root/entities';
import { UserDTO } from './types';

export const toUserDTO = async (user: IUser): Promise<UserDTO> => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
