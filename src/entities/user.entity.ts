/* eslint-disable @typescript-eslint/indent */
import { createJWT } from '@root/services/jwt';
import { compareHashedValue, hashValue } from '@root/utils/hash';
import {
 Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

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

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column({ name: 'invitation_confirmed', default: false })
  invitationConfirmed: boolean;

  @Column({ name: 'forgot_password_token' })
  forgotPasswordToken?: string;

  @Column({ name: 'forgot_password_token_expiration' })
  forgotPasswordTokenExpiration?: Date;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  constructor(email: string) {
    this.email = email;
  }

  public async setPassword(password: string): Promise<void> {
    this.password = await hashValue(password);
  }

  public async isPasswordMatch(password: string): Promise<boolean> {
    return compareHashedValue(password, this.password);
  }

  public async buildToken(): Promise<string> {
    return createJWT({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
    });
  }

  public assignProperties(user: Omit<Partial<IUser>, 'password'>) {
    Object.assign(this, user);
  }
}
