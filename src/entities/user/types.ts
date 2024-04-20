export interface IUser {
  id: number;
  email: string;
  password?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiration?: Date;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt?: Date;
  isPasswordMatch: (password: string) => Promise<boolean>;
  setPassword: (password: string) => Promise<void>;
  buildToken: () => Promise<string>;
}

export type UserTokenDestructured = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};
