/* eslint-disable @typescript-eslint/indent */
import {
 Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export interface IUser {
  id: number;
  email: string;
  password?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiration?: Date;
  createdAt: Date;
  updatedAt?: string;
}

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
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
  firstName?: string;

  @Column({ name: 'last_name' })
  lastName?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  constructor(email: string) {
    this.email = email;
  }
}
