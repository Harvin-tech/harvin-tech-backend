import { FastifyInstance } from 'fastify';
import { UserController } from '../../../controllers/user.controller';
import { getUserSchema, updateUserSchema } from '../../../schema/user.schema';

export default async function userRoutes(app: FastifyInstance) {
  app.get('/', getUserSchema, UserController.findAllUsers); //  get all users Route: GET '/private/users'
  app.patch('/:userId', updateUserSchema, UserController.updateUser); // update user Route: PATCH '/private/users/:userId'
}
