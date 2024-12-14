import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import { ENV } from '../config/env';

export default fp(async (fastify) => {
  fastify.register(fastifyCookie, {
    secret: ENV.COOKIE_SECRET,
  });
});
