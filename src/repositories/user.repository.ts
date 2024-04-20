import { IUser, User } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IUserRepository {
  save: (user: IUser) => Promise<IUser>;
  findByEmail: (email: string) => Promise<IUser | null>;
  findById: (id: string) => Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private repository: Repository<IUser> = buildRepository<IUser>(User)) {}

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  async save(user: IUser) {
    return this.repository.save(user);
  }

  async findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }
}
