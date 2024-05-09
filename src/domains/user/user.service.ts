import { UpdateUserBody } from '@root/routes/user/types';
import { UserRepository } from '@root/repositories/user.repository';
import StatusError from '@root/utils/statusError';
import { IUserRepository, UserDTO } from './types';
import { toUserDTO } from './user.dto';

export interface IUserService {
  updateUser(updateUserBody: UpdateUserBody, userToUpdate: number, currentUserId: number):
  Promise<UserDTO>;
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
    await user.setPassword(updateUserBody.password);

    return toUserDTO(await this.userRepository.save(user));
  }
}
