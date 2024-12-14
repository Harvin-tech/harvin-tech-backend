import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/user.service';
import {
  createError,
  readBody,
  readParams,
  readQuery,
  sendResponse,
} from '../hooks';
import { getUserQuery_I, updateUser_I } from '../types/user.type';
import readUser from '../hooks/readUser';
import { tokenUserSign_I } from '../types/auth.type';
import { UNAUTHORIZED } from '../types/errors.type';

export class UserController {
  static findAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = readUser<tokenUserSign_I>(req);

      if (!['admin', 'superadmin'].includes(user.role)) {
        return createError(
          UNAUTHORIZED.name,
          UNAUTHORIZED.status,
          UNAUTHORIZED.message
        );
      }

      const reqQuery = readQuery<getUserQuery_I>(req);

      const result = await UserService.findAllUsers(reqQuery);

      return sendResponse(reply, 200, 'Success', result);
    } catch (error) {
      console.error('ERROR_FIND_ALL_USERS', error);
      throw error;
    }
  };

  static updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { userId } = readParams<{ userId: string }>(req); // Extract userId from request params
      const reqBody = readBody<updateUser_I>(req); // Extract request body

      const updatedUser = await UserService.updateUserById(userId, reqBody);

      // Respond with the updated user
      return reply.status(200).send({
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
}
