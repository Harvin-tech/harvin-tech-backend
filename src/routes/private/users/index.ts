import { FastifyInstance } from 'fastify';
import { UserController } from '../../../controllers/user.controller';
import {
  changePasswordSchema,
  getUserByToken,
  getUserSchema,
  updateUserSchema,
} from '../../../schema/user.schema';

export default async function userRoutes(app: FastifyInstance) {
  app.get('/', getUserSchema, UserController.findAllUsers); //  get all users Route: GET '/private/users'
  app.patch('/:userId', updateUserSchema, UserController.updateUser); // update user Route: PATCH '/private/users/:userId'
  app.post(
    '/change-password',
    changePasswordSchema,
    UserController.changePassword
  ); // change password Route: POST '/private/users/change-password'
  app.get('/:userId', getUserSchema, UserController.getUserById); // get user by id Route: GET '/private/users/:userId'
  app.get('/token', getUserByToken, UserController.getUserByToken); // get user by id Route: GET '/private/users/token'
}
