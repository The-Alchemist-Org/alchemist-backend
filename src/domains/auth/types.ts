import { IUser } from '@root/entities';

export type AuthDTO = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IAuthRepository {
  findByEmail: (email: string) => Promise<IUser | null>;
  save: (user: IUser) => Promise<IUser>;
}
