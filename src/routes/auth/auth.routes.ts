import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { AuthService, IAuthService } from '@root/domains/auth';
import { loginValidation, signupValidation } from './validation';
import { LoginBody, SignupBody } from './types';

export const authRoutes = () => {
  const router = Router();
  const authService: IAuthService = new AuthService();

  /**
   * @swagger
   * /auth/login:
   *  post:
   *    summary: Login user
   *    description: "Attempt to login the user with given credentials"
   *    tags:
   *      - Auth
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/LoginBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/AuthDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/login',
    loginValidation,
    async (req: Request<null, null, LoginBody>, res: Response) => {
      try {
        const { email, password } = req.body;
        const response = await authService.login(email, password);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  /**
   * @swagger
   * /auth/signup:
   *  post:
   *    summary: Register a user
   *    description: "Attempt to register a user with given credentials"
   *    tags:
   *      - Auth
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/SignupBody'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/AuthDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      409:
   *        $ref: '#/components/responses/ConflictError'
   */
  router.post(
    '/signup',
    signupValidation,
    async (req: Request<null, null, SignupBody>, res: Response) => {
      try {
        const response = await authService.signup(req.body);
        return res.status(201).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
