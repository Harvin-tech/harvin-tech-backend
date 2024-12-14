import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance, opts: any) {
  app.post('/', (req, reply) => {
    return reply.send('Welcome to Harvin tech apis');
  });
}
