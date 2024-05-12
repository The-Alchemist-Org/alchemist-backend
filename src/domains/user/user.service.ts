import { UpdateUserBody } from '@root/routes/user/types';
import { UserRepository } from '@root/repositories/user.repository';
import StatusError from '@root/utils/statusError';
import { IUserRepository } from './types';
import { toAuthDTO } from '../auth/auth.dto';
import { AuthDTO } from '../auth/types';

export interface IUserService {
  updateUser(updateUserBody: UpdateUserBody, userToUpdate: number, currentUserId: number):
  Promise<AuthDTO>;
}

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository = new UserRepository(),
  ) {}

  async updateUser(updateUserBody: UpdateUserBody, userToUpdate: number, currentUserId: number) {
    if (userToUpdate !== currentUserId) {
      throw new StatusError(403, 'Forbidden');
    }
    const user = await this.userRepository.findById(currentUserId);
    if (!user) {
      throw new StatusError(404, 'User not found');
    }

    user.assignProperties(updateUserBody);
    if (updateUserBody.password) await user.setPassword(updateUserBody.password);

    return toAuthDTO(await this.userRepository.save(user));
  }
}
