import { handleError } from '@root/utils/handleError';
import { Request, Response, Router } from 'express';
import { AuthRequest } from '@root/types/request';
import { IUserService, UserService } from '@root/domains/user';
import { UpdateUserBody } from './types';
import { userValidation } from './validation';

export const userRoutes = () => {
  const router = Router();
  const userService: IUserService = new UserService();
  /**
   * @swagger
   * /users/{id}:
   *  put:
   *    summary: Updates a user
   *    description: "Attempt to update a user with given credentials"
   *    tags:
   *      - User
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/UpdateUserBody'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/UserDTO'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   */
  router.put(
    '/:id',
    userValidation,
    async (req: Request<{ id: number }, null, UpdateUserBody> & AuthRequest, res: Response) => {
      try {
        const response = await userService.updateUser(
          req.body,
          Number(req.params.id),
          Number(req.auth.id),
        );
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    },
  );

  return router;
};
