import { UserRepository } from '@root/repositories/user.repository';
import StatusError from '@root/utils/statusError';
import { SignupBody } from '@root/routes/auth/types';
import { User } from '@root/entities';
import { AuthDTO, IAuthRepository } from './types';
import { toAuthDTO } from './auth.dto';

export interface IAuthService {
  login(email: string, password: string): Promise<AuthDTO>;
  signup(signupBody: SignupBody): Promise<AuthDTO>;
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

  async signup(signupBody: SignupBody) {
    const emailTaken = await this.authRepository.findByEmail(signupBody.email);

    if (emailTaken) {
      throw new StatusError(409, 'User already exists');
    }

    const newUser = new User(signupBody.email);
    newUser.assignProperties(signupBody);
    await newUser.setPassword(signupBody.password);

    return toAuthDTO(await this.authRepository.save(newUser));
  }
}
