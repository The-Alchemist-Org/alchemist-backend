import { IUser } from '@root/entities';

export type UserDTO = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserRepository {
  findById: (id: number) => Promise<IUser | null>;
  save: (user: IUser) => Promise<IUser>;
}
