import { FastifyInstance } from 'fastify';
import { AuthMiddleware } from '../../middleware/auth.middleware';

export default async function (app: FastifyInstance, opts: any) {
  app.post('/', (req, reply) => {
    console.log('dsfghjk->', req.user);
    return reply.send('hello Private');
  });
}
