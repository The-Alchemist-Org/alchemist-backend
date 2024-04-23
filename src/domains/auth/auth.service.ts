import { UserRepository } from '@root/repositories/user.repository';
import StatusError from '@root/utils/statusError';
import { AuthDTO, IAuthRepository } from './types';
import { toAuthDTO } from './auth.dto';

export interface IAuthService {
  login(email: string, password: string): Promise<AuthDTO>;
}

export class AuthService implements IAuthService {
  constructor(
    private authRepository: IAuthRepository = new UserRepository(),
  ) {}

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new StatusError(401, 'User not found');
    }
    if (!(await user.isPasswordMatch(password))) {
      throw new StatusError(401, 'Invalid credentials');
    }

    return toAuthDTO(user);
  }
}
