import { FastifyRequest } from 'fastify';

export default function readUser<T>(request: FastifyRequest): T {
  return request.user as T;
}
