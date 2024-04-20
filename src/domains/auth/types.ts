import { IUser } from '@root/entities';

export type AuthDTO = {
  id: number;
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
